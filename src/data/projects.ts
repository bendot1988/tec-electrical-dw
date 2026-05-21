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
	galleryIntro?: string;
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
	{
		slug: 'kingsbury-school',
		title: 'Kingsbury School Leisure Centre',
		location: 'Tamworth',
		client: 'Kingsbury School',
		year: '2025',
		status: 'complete',
		summary:
			'Leisure centre refurbishment with new main electric panel, 400 amp sub-main, and full electrical installation across pool, plant, and circulation areas.',
		featuredImage: '/projects/kingsbury-school/featured.png',
		featuredAlt: 'Kingsbury School exterior with reception entrance',
		overview: [
			'Electrical and refurbishment works at Kingsbury School leisure centre, covering the swimming pool hall, changing and circulation areas, and associated plant.',
			'Scope included a new main electric panel, 400 amp sub-main distribution, cable tray and containment routes, lighting, fire alarm interfaces, and coordination through first fix to completion.',
		],
		remit: [
			'Main electric panel',
			'400 amp sub-main',
			'Leisure centre refurbishment',
			'Swimming pool hall lighting',
			'Cable tray and containment',
			'Corridor and circulation areas',
		],
		gallery: [
			{
				src: '/projects/kingsbury-school/featured.png',
				alt: 'Kingsbury School exterior',
			},
			{
				src: '/projects/kingsbury-school/main-electric-panel.png',
				alt: 'Main electric panel and switchgear installation',
			},
			{
				src: '/projects/kingsbury-school/sub-main-cabling.png',
				alt: '400 amp sub-main cabling on vertical cable tray',
			},
			{
				src: '/projects/kingsbury-school/swimming-pool-complete.png',
				alt: 'Refurbished indoor swimming pool with new lighting',
			},
			{
				src: '/projects/kingsbury-school/swimming-pool-lighting.png',
				alt: 'Swimming pool hall with truss lighting and blue tiled pool',
			},
			{
				src: '/projects/kingsbury-school/swimming-pool-overview.png',
				alt: 'Swimming pool overview showing pool deck and ceiling lights',
			},
			{
				src: '/projects/kingsbury-school/swimming-pool-refurb.png',
				alt: 'Swimming pool during refurbishment with scaffolding',
			},
			{
				src: '/projects/kingsbury-school/pool-refurb-in-progress.png',
				alt: 'Empty pool during tile and electrical refurbishment works',
			},
			{
				src: '/projects/kingsbury-school/rooftop-plant-systemair.png',
				alt: 'Systemair rooftop ventilation plant on school building',
			},
			{
				src: '/projects/kingsbury-school/rooftop-ventilation.png',
				alt: 'Rooftop ventilation equipment and insulated ductwork',
			},
			{
				src: '/projects/kingsbury-school/partition-first-fix.png',
				alt: 'Metal partition framing and first-fix electrical cabling',
			},
			{
				src: '/projects/kingsbury-school/cable-tray-installation.png',
				alt: 'Cable tray installation during leisure centre refurb',
			},
			{
				src: '/projects/kingsbury-school/leisure-centre-first-fix.png',
				alt: 'First-fix electrical work in leisure centre shell',
			},
			{
				src: '/projects/kingsbury-school/corridor-refurb.png',
				alt: 'Corridor refurbishment with ceiling grid and temporary lighting',
			},
			{
				src: '/projects/kingsbury-school/corridor-complete.png',
				alt: 'Completed corridor with emergency lighting and exit signage',
			},
			{
				src: '/projects/kingsbury-school/corridor-finished.png',
				alt: 'Finished corridor with wood flooring and recessed downlights',
			},
			{
				src: '/projects/kingsbury-school/corridor-work-in-progress.png',
				alt: 'Corridor electrical and flooring works in progress',
			},
			{
				src: '/projects/kingsbury-school/utility-room-cabinet.png',
				alt: 'Wall-mounted electrical cabinet in utility room',
			},
			{
				src: '/projects/kingsbury-school/utility-room-services.png',
				alt: 'Utility room with copper services and ceiling containment',
			},
			{
				src: '/projects/kingsbury-school/ceiling-grid-installation.png',
				alt: 'Suspended ceiling grid installation during refurb',
			},
		],
	},
	{
		slug: 'domestic-home-charnwood',
		title: 'Domestic Home, Charnwood',
		location: 'Charnwood, Leicestershire',
		client: 'Private residential',
		year: '2024',
		status: 'complete',
		summary:
			'Garden LED lighting at a domestic home in Charnwood, including pergola, planters, and feature wall lighting.',
		featuredImage: '/projects/domestic-home-charnwood/featured.png',
		featuredAlt: 'Domestic garden at dusk with integrated LED lighting in Charnwood',
		overview: [
			'Outdoor LED lighting for a domestic property in Charnwood, Leicestershire.',
			'Installation included LED strips to pergola and raised planters, spotlighting to planting, decorative backlighting to feature panels, and festoon lighting to the rear terrace.',
		],
		remit: [
			'LED strip lighting',
			'Garden spotlights',
			'Pergola lighting',
			'Feature wall lighting',
			'Festoon lighting',
		],
		galleryIntro:
			'Photography from the site, including planting and electrical installation work.',
		gallery: [
			{
				src: '/projects/domestic-home-charnwood/featured.png',
				alt: 'Domestic garden in Charnwood with LED lighting at dusk',
			},
		],
	},
	{
		slug: 'fairfax-communal-gym',
		title: 'Fairfax Communal Areas & Gym',
		location: 'Blaby, Leicestershire',
		client: 'Blaby District Council',
		year: '2025',
		status: 'complete',
		summary:
			'Electrical works for Fairfax communal areas and gym at Blaby District Council, including exterior lighting, entrance features, and pathway lighting.',
		featuredImage: '/projects/fairfax-communal-gym/featured.png',
		featuredAlt: 'Fairfax communal building entrance with illuminated glass canopy at dusk',
		overview: [
			'Electrical installation and lighting for Fairfax communal areas and gym facilities at the Blaby District Council offices.',
			'Works covered exterior and entrance lighting, ground-mounted uplights to signage and landscaping, feature downlights to brick and stone facades, and power and lighting to communal circulation routes.',
		],
		remit: [
			'Exterior feature lighting',
			'Entrance canopy lighting',
			'Pathway and ground lights',
			'Communal area power',
			'Gym electrical fit-out',
			'Signage lighting',
		],
		gallery: [
			{
				src: '/projects/fairfax-communal-gym/featured.png',
				alt: 'Fairfax communal entrance with red-lit glass canopy at night',
			},
			{
				src: '/projects/fairfax-communal-gym/glass-entrance-extension.png',
				alt: 'Modern glass entrance extension with stone pillar and exterior spotlights',
			},
			{
				src: '/projects/fairfax-communal-gym/council-offices-pathway.png',
				alt: 'Brick pathway with recessed ground lights leading to council entrance',
			},
			{
				src: '/projects/fairfax-communal-gym/council-welcome-sign-night.png',
				alt: 'Illuminated Blaby District Council welcome sign at night',
			},
			{
				src: '/projects/fairfax-communal-gym/council-sign-landscaping.png',
				alt: 'Council offices welcome sign in landscaped grounds',
			},
			{
				src: '/projects/fairfax-communal-gym/stone-wall-downlights.png',
				alt: 'Curved stone boundary wall with warm downlighting at dusk',
			},
			{
				src: '/projects/fairfax-communal-gym/brick-facade-exterior-lighting.png',
				alt: 'Brick communal building facade with exterior downlights at dusk',
			},
		],
	},
	{
		slug: 'college-of-policing',
		title: 'College of Policing',
		location: 'Ryton-on-Dunsmore',
		client: 'College of Policing',
		year: '2024',
		status: 'complete',
		summary:
			'Electrical and AV fit-out across classrooms, lecture theatres, and training suites at the College of Policing.',
		featuredImage: '/projects/college-of-policing/featured.png',
		featuredAlt: 'Tiered lecture theatre with LED ceiling lighting at the College of Policing',
		overview: [
			'Works at the College of Policing covered teaching spaces, seminar rooms, and circulation areas across the campus.',
			'Scope included LED ceiling lighting, projector and screen installations, interactive displays, power and data trunking at desk height, and general small power for training and conference rooms.',
		],
		remit: [
			'LED panel lighting',
			'Lecture theatre AV',
			'Interactive displays',
			'Power and data trunking',
			'Classroom small power',
			'Corridor lighting',
		],
		gallery: [
			{
				src: '/projects/college-of-policing/featured.png',
				alt: 'Lecture theatre with tiered seating and ceiling lighting',
			},
			{
				src: '/projects/college-of-policing/classroom-signage.png',
				alt: 'College of Policing classroom door signage',
			},
			{
				src: '/projects/college-of-policing/training-room.png',
				alt: 'Training room with wall-mounted display and trunking',
			},
			{
				src: '/projects/college-of-policing/seminar-room.png',
				alt: 'Seminar room with modular tables and recessed lighting',
			},
			{
				src: '/projects/college-of-policing/training-suite.png',
				alt: 'Large training suite with LED panels and projector',
			},
			{
				src: '/projects/college-of-policing/interactive-display.png',
				alt: 'Wall-mounted interactive display with integrated power and data',
			},
			{
				src: '/projects/college-of-policing/ceiling-lighting-install.png',
				alt: 'LED panel lighting installation in teaching space',
			},
			{
				src: '/projects/college-of-policing/corridor.png',
				alt: 'Refurbished corridor with recessed downlights',
			},
		],
	},
	{
		slug: 'nhs-kitchen-refurb',
		title: 'NHS Kitchen Refurb',
		location: 'NHS site',
		client: 'NHS',
		year: '2025',
		status: 'complete',
		summary:
			'Full kitchen and servery refurbishment for an NHS facility, including commercial cooking lines, lighting, power, and data infrastructure.',
		featuredImage: '/projects/nhs-kitchen-refurb/featured.png',
		featuredAlt: 'Refurbished NHS commercial kitchen with stainless steel line and LED lighting',
		overview: [
			'A complete overhaul of kitchen, servery, and staff dining areas at an NHS site, delivered to a hygienic, high-traffic standard.',
			'Works covered the main production kitchen, serving counters, coffee station, and dining space, with new lighting, power distribution, containment, and equipment feeds coordinated around live catering requirements.',
		],
		remit: [
			'Commercial kitchen lighting',
			'Power and small power',
			'Servery and POS areas',
			'Track and feature lighting',
			'Data cabinet and patching',
			'Staff dining area',
		],
		gallery: [
			{
				src: '/projects/nhs-kitchen-refurb/featured.png',
				alt: 'Refurbished commercial kitchen with cooking line and extraction',
			},
			{
				src: '/projects/nhs-kitchen-refurb/commercial-kitchen.png',
				alt: 'Stainless steel kitchen with Rational ovens and extraction canopy',
			},
			{
				src: '/projects/nhs-kitchen-refurb/kitchen-extraction.png',
				alt: 'Production kitchen with induction hob and extractor lighting',
			},
			{
				src: '/projects/nhs-kitchen-refurb/serving-counter-mural.png',
				alt: 'Curved servery counter with track lighting and food mural',
			},
			{
				src: '/projects/nhs-kitchen-refurb/serving-area.png',
				alt: 'Wide view of refurbished serving area with LED ceiling panels',
			},
			{
				src: '/projects/nhs-kitchen-refurb/servery-islands.png',
				alt: 'Servery islands with glass screens and pendant lighting',
			},
			{
				src: '/projects/nhs-kitchen-refurb/pos-checkout.png',
				alt: 'POS checkout counter with feature pendant and wall graphics',
			},
			{
				src: '/projects/nhs-kitchen-refurb/coffee-station.png',
				alt: 'Coffee station with mural, track lights, and appliances',
			},
			{
				src: '/projects/nhs-kitchen-refurb/coffee-counter.png',
				alt: 'Curved coffee counter with integrated lighting',
			},
			{
				src: '/projects/nhs-kitchen-refurb/dining-hall.png',
				alt: 'Staff dining hall with new flooring, LED panels, and wall lights',
			},
			{
				src: '/projects/nhs-kitchen-refurb/staff-dining-area.png',
				alt: 'Refurbished dining area with pendant and sconce lighting',
			},
			{
				src: '/projects/nhs-kitchen-refurb/data-cabinet.png',
				alt: 'Wall-mounted data cabinet with patch panel and PDU',
			},
		],
	},
	{
		slug: 'nhs-wembley-solar',
		title: 'NHS Wembley Solar PV',
		location: 'Wembley, London',
		client: 'NHS Property Services',
		year: '2026',
		status: 'in-progress',
		summary:
			'Solar PV installation at the Wembley Centre for Health & Care, currently in progress for NHS Property Services.',
		featuredImage: '/projects/nhs-wembley-solar/featured.png',
		featuredAlt: 'Wembley Centre for Health & Care NHS site entrance',
		overview: [
			'Solar PV works at the Wembley Centre for Health & Care, an NHS Property Services site in Wembley.',
			'This is a current project. We will update this case study with more detail and photography as the installation progresses.',
		],
		remit: ['Solar PV', 'System design', 'Installation', 'NHS site'],
		gallery: [
			{
				src: '/projects/nhs-wembley-solar/featured.png',
				alt: 'Wembley Centre for Health & Care exterior',
			},
			{
				src: '/projects/nhs-wembley-solar/solar-array-layout.png',
				alt: 'Planned solar array layout on the health centre roof',
			},
			{
				src: '/projects/nhs-wembley-solar/mounting-system.png',
				alt: 'Solar panel mounting system specification',
			},
		],
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

/** Newest year first for the projects overview grid. */
export function getProjectsByDate(): Project[] {
	return [...projects].sort((a, b) => Number(b.year) - Number(a.year));
}

/** Case studies shown on the homepage “Recent work” grid (order preserved). */
export const homepageFeaturedSlugs = ['code-harper-road'] as const;

export function getHomepageFeaturedProjects(): Project[] {
	return homepageFeaturedSlugs
		.map((slug) => getProject(slug))
		.filter((project): project is Project => project !== undefined);
}
