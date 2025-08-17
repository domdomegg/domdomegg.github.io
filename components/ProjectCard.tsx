import Link from 'next/link';
import {type Project} from '../lib/projects';

export const ProjectCard = ({project}: {project: Project}) => {
	return (
		<Link href={project.href} className='block not-prose group'>
			<div className='bg-white rounded-lg border border-red-100 group-hover:shadow-md group-focus:shadow-md transition-all duration-200 overflow-hidden'>
				{project.imageSrc && <div className='relative w-full bg-red-100 flex justify-center overflow-hidden' style={{aspectRatio: '1200/630'}}>
					{project.imageIsWindowShot
						? <img
							src={project.imageSrc}
							alt=''
							className='object-cover scale-130 translate-y-2 group-hover:scale-135 group-hover:translate-y-1 group-focus:scale-135 group-focus:translate-y-1 transition-transform duration-200 origin-top'
						/>
						: <img
							src={project.imageSrc}
							alt=''
							className='object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-200 w-full origin'
						/>}
				</div>}
				<div className='p-4'>
					<h3 className='font-semibold text-lg text-gray-900 group-hover:text-red-600 group-focus:text-red-600 transition-colors'>
						{project.title}
					</h3>
					<p className='text-gray-600 text-sm leading-relaxed'>
						{project.tagline}
					</p>
				</div>
			</div>
		</Link>
	);
};
