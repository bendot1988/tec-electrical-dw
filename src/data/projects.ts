export type ProjectStatus = 'complete' | 'in-progress';

export type ProjectImage = {
	src: string;
	alt: string;
};

export type Project = {
	slug: string;
	title: string;
	location: string;
	client: string;
	year: string;
	status: ProjectStatus;
	summary: string;
	featuredImage: string;
	featuredAlt: string;
	overview: string[];
	remit: string[];
	gallery: ProjectImage[];
};

export const projects: Project[] = [
	{
		slug: 'code-harper-road',
		title: 'Code Harper Road',
		location: 'Coventry',
		client: 'CODE Student Accommodation',
		year: '2024',
		status: 'complete',
		summary:
			'Purpose-built student accommodation on a former dairy factory site with electrical, life-safety, access, and communal fit-out delivered with CODE and building control.',
		featuredImage: '/projects/code-harper-road/featured.png',
		featuredAlt: 'Exterior of Code Harper Road student accommodation in Coventry',
		overview: [
			'A disused former dairy factory, knocked down and rebuilt as purpose-built student flats serving Coventry University and the surrounding areas.',
			'Acquired by CODE in 2024 as a repossessed building from a failed contractor. We worked closely with CODE and building control to complete the building and comply with building regulations.',
		],
		remit: [
			'Electrical installation',
			'Fire alarms',
			'Door access with NSP',
			'IP CCTV system',
			'AOV system',
			'Student lounge and chill-out fit-out',
		],
		gallery: [
			{
				src: '/projects/code-harper-road/featured.png',
				alt: 'Exterior of Code Harper Road student accommodation',
			},
			{
				src: '/projects/code-harper-road/code-sales-office.png',
				alt: 'Code Harper Road courtyard and sales office entrance',
			},
			{
				src: '/projects/code-harper-road/student-lounge.png',
				alt: 'Purpose-built student lounge with seating and bar area',
			},
			{
				src: '/projects/code-harper-road/lounge-pool-table.png',
				alt: 'Student chill-out area with pool table and feature ceiling lighting',
			},
			{
				src: '/projects/code-harper-road/lounge-corridor.png',
				alt: 'Communal lounge corridor with CCTV and emergency lighting',
			},
			{
				src: '/projects/code-harper-road/student-bedroom.png',
				alt: 'Completed student bedroom with desk and integrated power',
			},
			{
				src: '/projects/code-harper-road/student-bedroom-alt.png',
				alt: 'Student flat interior with heating and lighting controls',
			},
			{
				src: '/projects/code-harper-road/ensuite-bathroom.png',
				alt: 'Ensuite bathroom with LED mirror and contemporary tiling',
			},
			{
				src: '/projects/code-harper-road/bathroom-lighting.png',
				alt: 'Bathroom fit-out showing LED mirror and cove lighting',
			},
			{
				src: '/projects/code-harper-road/cctv-monitoring.png',
				alt: 'Hikvision IP CCTV monitoring across corridors, laundry, and common areas',
			},
			{
				src: '/projects/code-harper-road/network-rack.png',
				alt: 'Network rack with Hikvision switches for CCTV and building systems',
			},
		],
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
