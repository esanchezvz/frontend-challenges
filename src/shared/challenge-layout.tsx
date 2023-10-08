import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { buttonVariants } from '@/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

type ChallengeLayoutProps = {
  title: string
  solution: ReactNode
  requirements?: ReactNode
}

const ChallengeLayout = ({ requirements, solution, title }: ChallengeLayoutProps) => {
  return (
    <main className="flex px-5 flex-col h-screen">
      <div className="flex items-center justify-between border-b py-3">
        <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Link>

        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">{title}</h1>

        <div className="invisible" tabIndex={-1} />
      </div>

      <Tabs defaultValue="solution" className="w-full pt-2">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements">
          {requirements ? (
            requirements
          ) : (
            <div>
              <p className="mb-5">No requirements have been specified for this challenge</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="solution">{solution}</TabsContent>
      </Tabs>
    </main>
  )
}

export default ChallengeLayout
