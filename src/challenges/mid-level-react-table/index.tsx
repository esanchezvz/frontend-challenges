import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

const ReactMidLevelTable = () => {
  return (
    <main className="p-10 flex flex-col h-screen">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-5">
        React Mid Level Table
      </h1>

      <Tabs defaultValue="solution" className="w-full h-full">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="h-full">
          <div className="">
            <p className="mb-5">
              The objective of this test is to create an application similiar to the one provided in this
              link. To do so, you must use the{' '}
              <a
                href="https://randomuser.me"
                target="__blank"
                rel="noreferrer noopener"
                className="text-blue-400 underline"
              >
                Random User
              </a>{' '}
              api.
            </p>
            <ul className="list-disc ml-8">
              <li>Fetch 100 records from the api.</li>
              <li>Display data in a table format.</li>
              <li>Provide option to color rows.</li>
              <li>Add button to allow data to be sorted by country.</li>
              <li>Enable row deletion.</li>
              <li>Allow restoring of deleted rows.</li>
              <li>Handle any potential erros that may occur.</li>
              <li>Allow filtering by country.</li>
              <li>Avoid sorting again when the user is filtering data.</li>
              <li>Sort by clicking the column header.</li>
              <li>Provide a README.md with instructions on how to run the program.</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="solution" className=" h-full">
          <h1>Solution</h1>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default ReactMidLevelTable
