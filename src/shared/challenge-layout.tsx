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
    <main className="p-10 flex flex-col h-screen">
      <div className="flex items-center justify-between px-6 border-b pb-2 mb-2">
        <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Link>

        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-5">
          {title}
        </h1>

        <div className="invisible" tabIndex={-1} />
      </div>

      <Tabs defaultValue="solution" className="w-full h-full">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="h-full">
          {requirements ? (
            requirements
          ) : (
            <div>
              <p className="mb-5">No requirements have been specified for this challenge</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="solution" className="h-full">
          {solution}
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default ChallengeLayout
