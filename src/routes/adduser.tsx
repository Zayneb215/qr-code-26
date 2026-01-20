import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/adduser')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/adduser"!</div>
}
