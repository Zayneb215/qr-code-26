import React from "react";

interface HomePageBgProps {
	children: React.ReactNode;
}

function HomePageBg({ children }: HomePageBgProps) {
	return (
		<div className="min-h-screen w-full relative">
			{/* Dashed Top Fade Grid */}
			<div
				className="absolute inset-0 -z-10"
				style={{
					backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
					backgroundSize: "20px 20px",
					backgroundPosition: "0 0, 0 0",
					maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
					WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
					maskComposite: "intersect",
					WebkitMaskComposite: "source-in",
				}}
			/>
			<div
				className="absolute inset-0 -z-20"
				style={{
					background:
						"radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
				}}
			/>

			{children}
		</div>
	);
}

export default HomePageBg;
