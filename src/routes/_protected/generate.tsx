import { createFileRoute } from "@tanstack/react-router";
import GenerateQR from "@/pages/GeneratePage";

export const Route = createFileRoute("/_protected/generate")({
	component: GenerateQR,
});
