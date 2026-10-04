import React, { useId, useState } from 'react';
import { Activity, Gauge, RotateCw } from 'lucide-react';

const initialAngle = 38;
const initialPower = 64;

export default function RoboticsEcosystem() {
  const [angle, setAngle] = useState(38);
  const [power, setPower] = useState(64);
  const angleId = useId();
  const powerId = useId();

  return (
    <section className="motion-bench" aria-label="Robotics motion sandbox">
      <header className="motion-bench__header">
        <div><span className="motion-bench__icon"><Activity size={16} /></span><strong>ROBOTICS / MOTION LAB</strong></div>
        <span className="motion-bench__mode"><i /> SIMULATION</span>
      </header>

      <div className="motion-bench__layout">
        <div className="motion-bench__scene" style={{ '--arm-angle': `${angle - 90}deg`, '--motor-power': `${power}%` }}>
          <div className="motion-bench__scene-top"><span>ARM / 01</span><span>3 AXIS · SERVO</span></div>
          <div className="motion-bench__grid" />
          <div className="motion-bench__arm" aria-hidden="true">
            <span className="motion-bench__joint motion-bench__joint--base" />
            <span className="motion-bench__segment motion-bench__segment--lower" />
            <span className="motion-bench__joint motion-bench__joint--elbow" />
            <span className="motion-bench__segment motion-bench__segment--upper" />
            <span className="motion-bench__joint motion-bench__joint--wrist" />
            <span className="motion-bench__gripper"><i /><b /></span>
          </div>
          <div className="motion-bench__axis motion-bench__axis--x">X</div>
          <div className="motion-bench__axis motion-bench__axis--y">Y</div>
          <div className="motion-bench__readout"><span>JOINT 02</span><strong>{angle}°</strong></div>
        </div>

        <div className="motion-bench__controls">
          <div className="motion-bench__controls-title">
            <div><span>CONTROL PANEL</span><h2>Adjust the motion.</h2></div>
            <button
              aria-label="Reset motion controls"
              className="motion-bench__reset"
              onClick={() => { setAngle(initialAngle); setPower(initialPower); }}
              title="Reset motion controls"
              type="button"
            >
              <RotateCw size={17} />
            </button>
          </div>
          <label className="motion-bench__control">
            <span><b>Elbow angle</b><output htmlFor={angleId}>{angle}°</output></span>
            <input id={angleId} max={150} min={20} onChange={(event) => setAngle(Number(event.target.value))} type="range" value={angle} />
            <small><span>20°</span><span>150°</span></small>
          </label>
          <label className="motion-bench__control">
            <span><b>Motor output</b><output htmlFor={powerId}>{power}%</output></span>
            <input id={powerId} max={100} min={0} onChange={(event) => setPower(Number(event.target.value))} type="range" value={power} />
            <small><span>0%</span><span>100%</span></small>
          </label>
          <div className="motion-bench__telemetry"><Gauge size={15} /><span>Drive output</span><b>{power > 80 ? 'HIGH' : power > 35 ? 'NOMINAL' : 'LOW'}</b></div>
          <p className="motion-bench__note">Visual simulation only. No hardware is connected.</p>
        </div>
      </div>
    </section>
  );
}