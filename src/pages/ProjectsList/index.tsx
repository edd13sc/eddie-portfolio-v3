import { useEffect } from 'react'
import { PageHeading } from '../../components/Headings'
// import { listFiles } from '../../util/data/extractDataFromGoogle';

const ProjectsList = () => {

  useEffect(() => {
    // listFiles('myFolder/').catch(console.error);
  }, [])

  return (
    <div className='flex w-full'>
      <PageHeading text='jry' />
    </div>
  )
}

export default ProjectsList