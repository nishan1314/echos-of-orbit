import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Globe({ tex, hover, glow }: { tex: string; hover: boolean; glow: string }) {
  const map = useLoader(THREE.TextureLoader, tex);
  map.colorSpace = THREE.SRGBColorSpace;
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((state, d) => {
    if (!ref.current) return;
    t.current += d;
    ref.current.rotation.y += d * (hover ? 0.45 : 0.12);
    ref.current.position.y = Math.sin(t.current * 0.8) * 0.06;
    const target = hover ? 1.12 : 1;
    const s = THREE.MathUtils.lerp(ref.current.scale.x, target, 0.08);
    ref.current.scale.setScalar(s);
    const { x, y } = state.pointer;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.25, 0.05);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, x * 0.1, 0.05);
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.4, 96, 96]} />
        <meshStandardMaterial map={map} bumpMap={map} bumpScale={0.04} roughness={1} metalness={0} />
      </mesh>
      <mesh scale={1.06}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color={glow} transparent opacity={hover ? 0.12 : 0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Galaxy({ hover }: { hover: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const [pos, col] = useMemo(() => {
    const n = 9000, p = new Float32Array(n * 3), c = new Float32Array(n * 3);
    const inner = new THREE.Color("#9fe8ff"), outer = new THREE.Color("#9b5cff");
    for (let i = 0; i < n; i++) {
      const r = Math.pow(Math.random(), 1.6) * 2.4;
      const branch = (i % 3) * ((Math.PI * 2) / 3);
      const spin = r * 2.2;
      const rand = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.35;
      p[i * 3] = Math.cos(branch + spin) * r + rand();
      p[i * 3 + 1] = rand() * 0.4;
      p[i * 3 + 2] = Math.sin(branch + spin) * r + rand();
      const m = inner.clone().lerp(outer, r / 2.4);
      c[i * 3] = m.r; c[i * 3 + 1] = m.g; c[i * 3 + 2] = m.b;
    }
    return [p, c];
  }, []);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * (hover ? 0.35 : 0.08);
    const s = THREE.MathUtils.lerp(ref.current.scale.x, hover ? 1.12 : 1, 0.08);
    ref.current.scale.setScalar(s);
  });
  return (
    <points ref={ref} rotation={[0.5, 0, 0.15]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function Planet3D({ kind, tex, hover }: { kind: "moon" | "mars" | "deep"; tex?: string; hover: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.4], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={kind === "mars" ? 0.12 : 0.08} />
      <directionalLight position={[-4, 2, 3]} intensity={kind === "mars" ? 2.6 : 2.4} color={kind === "mars" ? "#ffd2b0" : "#ffffff"} />
      {kind === "deep" ? <Galaxy hover={hover} /> : <Globe tex={tex!} hover={hover} glow={kind === "mars" ? "#ff7a3d" : "#cfe6ff"} />}
    </Canvas>
  );
}
