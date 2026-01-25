import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/adduser')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/adduser"!</div>
}
