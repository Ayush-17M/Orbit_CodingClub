import React, { useState } from 'react';
import { ArrowDownRight, Check, Crop, Layers3, Type } from 'lucide-react';

const palettes = [
	{ name: 'Signal', colors: ['#f15a24', '#f4efe7', '#10110f'] },
	{ name: 'Field', colors: ['#a7c957', '#edf1dc', '#263329'] },
	{ name: 'Studio', colors: ['#f2b7d5', '#fff0e5', '#382b47'] },
];

const tools = [
	{ id: 'select', label: 'Select tool', Icon: Crop },
	{ id: 'type', label: 'Typography tool', Icon: Type },
	{ id: 'layers', label: 'Layers panel', Icon: Layers3 },
];

export default function GraphicsEcosystem() {
	const [activePalette, setActivePalette] = useState(0);
	const [activeTool, setActiveTool] = useState('select');
	const palette = palettes[activePalette];

	return (
		<section className="design-workbench" aria-label="Visual design workbench">
			<header className="design-workbench__bar">
				<div>
					<span className="design-workbench__file-mark"><Layers3 size={15} /></span>
					<strong>orbit_identity / artboard</strong>
				</div>
				<span className="design-workbench__status"><i /> ALL CHANGES SAVED</span>
			</header>

			<div className="design-workbench__layout">
				<aside className="design-workbench__tools" aria-label="Design tools">
					{tools.map(({ id, label, Icon }) => (
						<button
							aria-label={label}
							aria-pressed={activeTool === id}
							className={activeTool === id ? 'is-active' : ''}
							key={id}
							onClick={() => setActiveTool(id)}
							title={label}
							type="button"
						>
							<Icon size={17} />
						</button>
					))}
				</aside>

				<div className="design-workbench__canvas-wrap">
					<div
						className="design-workbench__canvas"
						style={{
							'--palette-accent': palette.colors[0],
							'--palette-paper': palette.colors[1],
							'--palette-ink': palette.colors[2],
						}}
					>
						<div className="design-workbench__canvas-meta">
							<span>ORBIT / COMMUNITY</span>
							<span>VISUAL IDENTITY · 2026</span>
						</div>
						<div className="design-workbench__art">
							<img src="/images/pic1.jpeg" alt="Orbit community at a campus event" />
							<div className="design-workbench__art-copy">
								<span>MAKE ROOM</span>
								<strong>FOR<br />IDEAS.</strong>
								<small>LEARN / MAKE / SHARE</small>
							</div>
							<span className="design-workbench__art-index">01—03</span>
						</div>
						<div className="design-workbench__canvas-foot">
							<span>FIG. 01 — COMMUNITY CAMPAIGN</span>
							<ArrowDownRight size={16} />
						</div>
					</div>
				</div>

				<aside className="design-workbench__inspector">
					<span className="design-workbench__label">COLOR SYSTEM</span>
					<h3>Choose a palette</h3>
					<div className="design-workbench__palettes">
						{palettes.map((option, index) => (
							<button
								aria-label={`${option.name} palette`}
								aria-pressed={index === activePalette}
								className={index === activePalette ? 'is-active' : ''}
								key={option.name}
								onClick={() => setActivePalette(index)}
								type="button"
							>
								<span className="design-workbench__swatches">
									{option.colors.map((color) => (
										<i key={color} style={{ backgroundColor: color }} />
									))}
								</span>
								<span>{option.name}</span>
								{index === activePalette && <Check size={14} />}
							</button>
						))}
					</div>
					<div className="design-workbench__inspector-rule" />
					<span className="design-workbench__label">LAYERS</span>
					<p><i /> Display / headline</p>
					<p><i /> Event photography</p>
					<p><i /> Caption / metadata</p>
				</aside>
			</div>
		</section>
	);
}