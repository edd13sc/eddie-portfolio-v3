import { useEffect } from 'react'
import { PageHeading } from '../../components/Headings'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { projectsList } from './list'
// import { listFiles } from '../../util/data/extractDataFromGoogle';

const ProjectsList = () => {

  useEffect(() => {
    // listFiles('myFolder/').catch(console.error);
  }, [])

  return (
    <div className='flex w-full flex-col'>
      <PageHeading text='Projects' />
      <div className='flex p-4 pt-8'>
        {
          projectsList.map((proj) => {
            return (
              <ProjectCard {...proj} />
            )
          })
        }
      </div>
    </div>
  )
}

export default ProjectsList