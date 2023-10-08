import ChallengeLayout from '@/shared/challenge-layout'

import TransferList from './components/transfer-list'

const Requirements = () => {
  return (
    <div>
      <p className="mb-5">
        The objective of this test is to create a re usbale component that allows elements from one list to be
        transfered to another list.
      </p>
    </div>
  )
}

const initialList = Array.from(Array(10).keys()).map((i) => ({
  title: `List item ${i + 1}`,
  id: Math.random().toString(16).slice(2),
}))

const ReactTransferList = () => {
  return (
    <ChallengeLayout
      title="React Transfer List"
      solution={
        <div className="h-[60vh] w-[800px] mx-auto">
          <TransferList list={initialList} />
        </div>
      }
      requirements={<Requirements />}
    />
  )
}

export default ReactTransferList
