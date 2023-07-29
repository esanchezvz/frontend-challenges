import { Link } from 'react-router-dom'

import { buttonVariants } from '@/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { ScrollArea } from '@/ui/scroll-area'

type Project = {
  title: string
  id: string
  link: string
  description: string
}

const projects: Project[] = [
  {
    title: 'React Mid Level Table',
    id: 'react-mid-level-table',
    link: '/react-mid-level-table',
    description:
      'Application that fetches some data and displays it in a tabular way, meeting specific rquirements.',
  },
]

const Root = () => {
  return (
    <main className="p-10 flex flex-col h-screen">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-20">
        React Challenges
      </h1>

      <ScrollArea className="grow w-full">
        <div className="container flex gap-3 flex-wrap justify-center">
          {projects.map((p, i) => {
            return (
              <Card className="w-[30%]" key={p.id + i}>
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="flex justify-between">
                  <Link to={p.link} className={buttonVariants({ className: 'w-full' })}>
                    Go to Project
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </main>
  )
}

export default Root
