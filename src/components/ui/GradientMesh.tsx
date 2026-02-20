'use client'

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial glow top-left: cyan */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan/10 blur-[120px]" />
      {/* Radial glow top-right: gold */}
      <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[100px]" />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
