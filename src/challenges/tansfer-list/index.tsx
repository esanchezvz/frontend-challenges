import ChallengeLayout from '@/shared/challenge-layout'

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

const ReactTransferList = () => {
  return <ChallengeLayout title="React Transfer List" solution={null} requirements={<Requirements />} />
}

export default ReactTransferList
