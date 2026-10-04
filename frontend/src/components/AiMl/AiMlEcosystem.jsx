import React, { useId, useRef, useState } from 'react';
import { Activity, ArrowRight, Braces, ScanEye, Sparkles } from 'lucide-react';

const models = [
  { id: 'vision', label: 'Vision', icon: ScanEye, task: 'Image classification', output: 'ceramic mug', confidence: '98.2%', bars: [82, 98, 34, 21] },
  { id: 'language', label: 'Language', icon: Braces, task: 'Intent detection', output: 'product question', confidence: '94.7%', bars: [94, 61, 28, 17] },
  { id: 'forecast', label: 'Forecast', icon: Activity, task: 'Demand estimate', output: 'steady growth', confidence: '89.1%', bars: [48, 70, 89, 77] },
];

const stages = ['Collect data', 'Train model', 'Evaluate result'];

export default function AiMlEcosystem() {
  const [activeModel, setActiveModel] = useState(models[0]);
  const componentId = useId();
  const tabRefs = useRef([]);
  const activeIndex = models.findIndex((model) => model.id === activeModel.id);

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % models.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + models.length) % models.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = models.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveModel(models[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="model-lab" aria-label="Interactive model sandbox">
      <header className="model-lab__topbar">
        <div className="model-lab__identity">
          <span className="model-lab__mark"><Sparkles size={16} /></span>
          <div><span>ORBIT / APPLIED AI</span><strong>Model sandbox</strong></div>
        </div>
        <span className="model-lab__status"><i /> DEMO PIPELINE</span>
      </header>

      <div className="model-lab__body">
        <aside className="model-lab__rail" aria-label="Model workflow">
          <span className="model-lab__eyebrow">WORKFLOW</span>
          {stages.map((stage, index) => (
            <div className={`model-lab__stage ${index === 2 ? 'is-current' : ''}`} key={stage}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{stage}</strong>
              {index < stages.length - 1 && <i />}
            </div>
          ))}
        </aside>

        <div className="model-lab__workspace">
          <div className="model-lab__workspace-head">
            <div><span className="model-lab__eyebrow">CHOOSE A TASK</span><h2>Run a small experiment.</h2></div>
            <span className="model-lab__version">v0.8.4</span>
          </div>

          <div className="model-lab__tabs" role="tablist" aria-label="Demo model type">
            {models.map((model, index) => {
              const Icon = model.icon;
              const selected = activeIndex === index;
              const tabId = `${componentId}-tab-${model.id}`;
              const panelId = `${componentId}-panel`;

              return (
                <button
                  aria-selected={selected}
                  aria-controls={panelId}
                  className={selected ? 'is-active' : ''}
                  id={tabId}
                  key={model.id}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  onClick={() => setActiveModel(model)}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  role="tab"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <Icon size={15} /> {model.label}
                </button>
              );
            })}
          </div>

          <div
            aria-labelledby={`${componentId}-tab-${activeModel.id}`}
            className="model-lab__result"
            id={`${componentId}-panel`}
            role="tabpanel"
            tabIndex={0}
          >
            <div className="model-lab__result-head">
              <span>DEMO OUTPUT <ArrowRight size={13} /></span>
              <span>task / {activeModel.task.toLowerCase()}</span>
            </div>
            <div className="model-lab__prediction">
              <span>Top prediction</span>
              <strong key={activeModel.output}>{activeModel.output}</strong>
              <small>confidence <b>{activeModel.confidence}</b></small>
            </div>
            <div className="model-lab__bars" aria-label={`Confidence ${activeModel.confidence}`}>
              {activeModel.bars.map((value, index) => (
                <div className="model-lab__bar-row" key={`${activeModel.id}-${index}`}>
                  <span>{['class A', 'class B', 'class C', 'other'][index]}</span>
                  <i><b style={{ width: `${value}%` }} /></i>
                  <small>{value}%</small>
                </div>
              ))}
            </div>
          </div>
          <p className="model-lab__footnote">Illustrative interface only. No model is run in this browser demo.</p>
        </div>
      </div>
    </section>
  );
}