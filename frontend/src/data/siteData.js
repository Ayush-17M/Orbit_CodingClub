export const DEFAULT_DATA = {
    hero: { title: 'BUILD. CREATE. INNOVATE.', description: 'A community of builders exploring AI, development, data, robotics, design and emerging technology.', cta: 'EXPLORE THE WINGS' },
    intro: {
        title: 'About us',
        description: 'ORBIT is a technical and creative community built around learning, experimentation, collaboration and shipping meaningful work.'
    },
    wings: [
        { id: 'ai', number: '01', name: 'AI / ML', description: 'Explore artificial intelligence, machine learning and intelligent systems.', icon: 'Brain', accent: 'Neural networks · CV · NLP' },
        { id: 'dev', number: '02', name: 'DEVELOPMENT', description: 'Build modern web, app and full-stack experiences with practical engineering.', icon: 'Code2', accent: 'Frontend · Full Stack · Apps' },
        { id: 'dsa', number: '03', name: 'DSA', description: 'Master data structures, algorithms, competitive programming and problem solving.', icon: 'Binary', accent: 'Algorithms · CP · Problem Solving' },
        { id: 'robotics', number: '04', name: 'ROBOTICS', description: 'Prototype intelligent machines through sensors, control, embedded systems and 3D thinking.', icon: 'Bot', accent: 'Embedded · Sensors · Automation' },
        { id: 'design', number: '05', name: 'GRAPHICS DESIGNING', description: 'Shape interfaces, identities and motion through visual systems and creative direction.', icon: 'PenTool', accent: 'UI/UX · Branding · Motion' }
    ],
    resources: [
        { id: 1, category: 'DSA', title: 'DSA ROADMAP', description: 'Beginner-to-advanced learning path for data structures and algorithms.', date: 'Editable date', type: 'ROADMAP', url: 'https://roadmap.sh/pdfs/roadmaps/datastructures-and-algorithms.pdf' },
        { id: 2, category: 'AI / ML', title: 'ML STARTER KIT', description: 'A curated frontend-only placeholder for notes, tutorials and learning material.', date: 'Editable date', type: 'NOTES', url: 'https://jnnce.ac.in/jnndemo/aiml/ml/Notes.pdf' },
        { id: 3, category: 'DEVELOPMENT', title: 'WEB BUILD GUIDE', description: 'Practical resources for building modern web experiences.', date: 'Editable date', type: 'GUIDE', url: 'https://cdn.codewithmosh.com/image/upload/v1721763853/guides/web-roadmap.pdf' },
        { id: 4, category: 'ROBOTICS', title: 'ROBOTICS', description: 'The Robotics Wing focuses on designing, building, and programming robots using electronics, mechanical systems, and coding. ', date: 'Editable date', type: 'ROADMAP', url: 'https://sitams.ac.in/wp-content/uploads/2025/02/IOT-Lecture-Notes.pdf' },
        { id: 5, category: 'GRAPHICS DESIGNING', title: 'DESIGN YOUR IDEA', description: 'The Graphics Designing Wing focuses on creating attractive and creative visual content such as posters, banners, logos, social media designs, and event creatives.', date: 'Editable date', type: 'START', url: 'https://mescindia.org/images/pdf/trainers-guide/participant/Graphic%20Designer%20Participant%20Handbook.pdf' }
    ],
    gallery: [
        { id: 1, title: 'Event Moment 01', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic1.jpeg' },
        { id: 5, title: 'Event Moment 02', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic2.jpeg' },
        { id: 6, title: 'Event Moment 03', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic3.jpeg' },
        { id: 7, title: 'Event Moment 04', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic4.jpeg' },
        { id: 8, title: 'Event Moment 05', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic5.jpeg' },
        { id: 9, title: 'Event Moment 06', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic6.jpeg' },
        { id: 10, title: 'Event Moment 07', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic7.jpeg' },
        { id: 11, title: 'Event Moment 08', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic8.jpeg' },
        { id: 12, title: 'Event Moment 09', category: 'EVENTS', description: 'Orbit community event.', image: '/images/pic8.jpeg' },
        { id: 2, title: 'Build Session', category: 'PROJECTS', description: 'Replace this placeholder with your project image.', image: '' },
        { id: 3, title: 'Creative Work', category: 'DESIGN', description: 'Replace this placeholder with your design image.', image: '' },
        { id: 4, title: 'Team Activity', category: 'TEAM', description: 'Replace this placeholder with your team image.', image: '' }
    ],
    about: { text: 'We create a space where technical curiosity and creative practice meet.', mission: 'Learn together, build boldly and make technology accessible through community.', vision: 'A culture of builders who turn ideas into useful, thoughtful experiences.', stats: [{ label: 'WINGS', value: '05+' }, { label: 'MEMBERS', value: '100+' }, { label: 'PROJECTS', value: '20+' }, { label: 'EVENTS', value: '10+' }] },
    contact: { address: 'Campus of Siwan Engineering College, Mairwa Road, Old Suta Mill Factory, Bhada Khurd, Siwan Pin - 841226', phone: '', email: 'gecsiwan.orbit@gmail.com', mapUrl: 'https://www.google.com/maps?q=Government+Engineering+College,+Siwan&output=embed', mapLink: 'https://www.google.com/maps/place/Government+Engineering+College,+Siwan/@25.6918432,82.8449627,7z/data=!4m6!3m5!1s0x3992ff716c7b37ad:0x5737371d64c4aed1!8m2!3d26.2251907!4d84.3288573!16s%2Fg%2F11j8m_g3ng?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D', LinkedIn: 'https://www.linkedin.com/company/orbit-coding-club/posts/?feedView=all' },
    social: { instagram: '', linkedin: '', github: '', youtube: '' }
};

export function getWingPath(id) {
    const paths = {
        ai: '/wings/aiml',
        dev: '/wings/development',
        dsa: '/wings/dsa',
        robotics: '/wings/robotics',
        design: '/wings/graphics-design'
    };

    return paths[id] || `/wings/${id}`;
}

const KEY = 'ORBIT_site_data_v1';
export function getData() {
    try {
        const stored = localStorage.getItem(KEY);
        if (!stored) return DEFAULT_DATA;
        const data = JSON.parse(stored);
        const defaultsById = new Map(DEFAULT_DATA.resources.map((resource) => [resource.id, resource]));
        const storedGalleryById = new Map((data.gallery || []).map((item) => [item.id, item]));
        const gallery = DEFAULT_DATA.gallery.map((item) => ({
            ...item,
            ...storedGalleryById.get(item.id),
            image: storedGalleryById.get(item.id)?.image || item.image
        }));
        const defaultGalleryIds = new Set(DEFAULT_DATA.gallery.map((item) => item.id));
        return {
            ...data,
            contact: {
                ...DEFAULT_DATA.contact,
                ...data.contact,
                mapUrl: data.contact?.mapUrl || DEFAULT_DATA.contact.mapUrl,
                mapLink: data.contact?.mapLink || DEFAULT_DATA.contact.mapLink
            },
            resources: data.resources.map((resource) => ({
                ...defaultsById.get(resource.id),
                ...resource
            })),
            gallery: [
                ...gallery,
                ...(data.gallery || []).filter((item) => !defaultGalleryIds.has(item.id))
            ]
        };
    } catch { return DEFAULT_DATA }
}
export function saveData(data) { localStorage.setItem(KEY, JSON.stringify(data)); window.dispatchEvent(new Event('site-data-updated')); }
export function updateData(patch) { const next = { ...getData(), ...patch }; saveData(next); return next }
export function resetData() { localStorage.removeItem(KEY); window.dispatchEvent(new Event('site-data-updated')); return DEFAULT_DATA }
export { KEY };
