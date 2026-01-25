import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/generate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/generate"!</div>
}
