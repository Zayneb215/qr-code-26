interface BackgroundProps {
	children: React.ReactNode;
}

function Background({ children }: BackgroundProps) {
	return (
		<div className="min-h-screen w-full bg-white relative">
			{/*  Diagonal Cross Center Fade Grid Background */}
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
					backgroundSize: "40px 40px",
					WebkitMaskImage:
						"radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
					maskImage:
						"radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
				}}
			/>
			{children}
		</div>
	);
}

export default Background;
