import ChallengeLayout from '@/shared/challenge-layout'

import UsersTable from './components/user-table'
import UsersProvider from './provider'

const Requirements = () => {
  return (
    <div>
      <p className="mb-5">
        The objective of this test is to create an application similiar to the one provided in this link. To
        do so, you must use the{' '}
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
  )
}

const ReactMidLevelTable = () => {
  return (
    <UsersProvider>
      <ChallengeLayout
        title="React Mid Level Table"
        solution={<UsersTable />}
        requirements={<Requirements />}
      />
    </UsersProvider>
  )
}

export default ReactMidLevelTable
