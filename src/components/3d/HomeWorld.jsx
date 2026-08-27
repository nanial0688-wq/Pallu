import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

function RakhiObject({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={[-2, 0, 0]} cursor="pointer">
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.1, 16, 100]} />
          <meshStandardMaterial color={hovered ? "#ffeb3b" : "#ffc107"} metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={hovered ? "#ff5252" : "#f44336"} />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          Tie Rakhi
        </Text>
      </group>
    </Float>
  );
}

function GiftBox({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={[2, 0, 0]} cursor="pointer">
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color={hovered ? "#4caf50" : "#388e3c"} />
        </mesh>
        {/* Ribbon */}
        <mesh position={[0, 0.41, 0]}>
          <planeGeometry args={[0.2, 0.8]} />
          <meshStandardMaterial color="#ffeb3b" />
        </mesh>
        <Text position={[0, -1, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          Surprises
        </Text>
      </group>
    </Float>
  );
}

function HeartObject({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={[0, 1.5, -1]} cursor="pointer">
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color={hovered ? "#ff8a80" : "#e91e63"} />
        </mesh>
        <Text position={[0, -1.2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          Message
        </Text>
      </group>
    </Float>
  );
}

function MemoryFrame({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
      <group onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={[0, -1.5, -1]} cursor="pointer">
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.1]} />
          <meshStandardMaterial color={hovered ? "#e0e0e0" : "#ffffff"} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.0, 0.7]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <Text position={[0, -0.8, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          Memories
        </Text>
      </group>
    </Float>
  );
}

function ResponsiveGroup({ children }) {
  const { viewport } = useThree();
  // If viewport width is small (like mobile phones), scale down the group so objects stay on screen
  const scale = viewport.width < 5 ? viewport.width / 6 : 1; 
  return <group scale={scale}>{children}</group>;
}

export default function HomeWorld({ onNavigate }) {
  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-8 w-full text-center z-10 pointer-events-none">
        <h2 className="text-3xl md:text-4xl font-serif text-amber-300 drop-shadow-lg">Explore Your World</h2>
        <p className="text-amber-100/80 mt-2">Click on the floating objects</p>
      </div>

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffedd5" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#c7d2fe" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <ResponsiveGroup>
          <RakhiObject onClick={() => onNavigate('rakhi-tie')} />
          <GiftBox onClick={() => onNavigate('games')} />
          <HeartObject onClick={() => onNavigate('finale')} />
          <MemoryFrame onClick={() => onNavigate('memories')} />
        </ResponsiveGroup>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </motion.div>
  );
}
