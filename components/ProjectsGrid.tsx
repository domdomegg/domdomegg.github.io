import {ProjectCard} from './ProjectCard';
import {type Project} from '../lib/projects';

type ProjectsGridProps = {
	projects: Project[];
};

export const ProjectsGrid = ({projects}: ProjectsGridProps) => {
	const sortedProjects = [...projects].sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return (
		<div>
			<h2 className='text-2xl font-bold mb-6'>projects</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				{sortedProjects.map((project) => (
					<ProjectCard
						key={project.href}
						project={project}
					/>
				))}
			</div>
		</div>
	);
};
