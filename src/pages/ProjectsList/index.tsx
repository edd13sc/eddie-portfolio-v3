import { useEffect } from 'react'
import { PageHeading } from '../../components/Headings'
// import { listFiles } from '../../util/data/extractDataFromGoogle';

const ProjectsList = () => {

  useEffect(() => {
    // listFiles('myFolder/').catch(console.error);
  }, [])

  return (
    <div className='flex'>
      <PageHeading text='Projects' />
    </div>
  )
}

export default ProjectsList