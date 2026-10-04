import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { saveData, resetData } from '../../data/siteData';

const tabs = [
  'Dashboard',
  'Home',
  'Wings',
  'Resources',
  'Gallery',
  'About',
  'Contact',
  'Settings'
];

export default function Admin({ data }) {
  if (sessionStorage.getItem('admin-auth') !== '1') {
    return <Navigate to="/admin/login" replace />;
  }

  const [tab, setTab] = useState('Dashboard');
  const [draft, setDraft] = useState(
    structuredClone(data)
  );

  const patch = (path, value) => {
    const next = structuredClone(draft);

    let obj = next;

    path
      .slice(0, -1)
      .forEach((key) => {
        obj = obj[key];
      });

    obj[path[path.length - 1]] = value;

    setDraft(next);
  };

  const commit = () => {
    saveData(draft);
  };

  const logout = () => {
    sessionStorage.removeItem('admin-auth');
    window.location.href = '/admin/login';
  };

  const exportData = () => {
    const blob = new Blob(
      [JSON.stringify(draft, null, 2)],
      {
        type: 'application/json'
      }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'site-data.json';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const imported = JSON.parse(
          reader.result
        );

        setDraft(imported);
      } catch {
        alert('Invalid JSON file.');
      }
    };

    reader.readAsText(file);

    e.target.value = '';
  };

  const reset = () => {
    const defaults = resetData();
    setDraft(structuredClone(defaults));
  };

  return (
    <div className="admin-shell section-cream">
      {/* SIDEBAR */}
      <aside className="admin-side">
        <div className="brand">
          TK<span>.</span>
        </div>

        {tabs.map((item) => (
          <button
            key={item}
            className={
              tab === item ? 'active' : ''
            }
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}

        <button onClick={logout}>
          LOG OUT
        </button>
      </aside>

      {/* MAIN */}
      <section className="admin-main">
        <div className="admin-head">
          <div>
            <span className="eyebrow">
              FRONTEND CMS
            </span>

            <h1>{tab}</h1>
          </div>

          <div className="admin-actions">
            <button onClick={commit}>
              SAVE CHANGES
            </button>

            <button onClick={reset}>
              RESET
            </button>
          </div>
        </div>

        <div className="demo-warning">
          Frontend demo admin — connect a real
          authentication/backend system before
          production use.
        </div>

        {tab === 'Dashboard' && (
          <Dashboard data={draft} />
        )}

        {tab === 'Home' && (
          <HomeEditor
            data={draft}
            patch={patch}
          />
        )}

        {tab === 'Wings' && (
          <WingsEditor
            data={draft}
            setData={setDraft}
          />
        )}

        {tab === 'Resources' && (
          <ListEditor
            title="Resources"
            data={draft.resources}
            setData={(value) =>
              setDraft({
                ...draft,
                resources: value
              })
            }
          />
        )}

        {tab === 'Gallery' && (
          <ListEditor
            title="Gallery"
            data={draft.gallery}
            setData={(value) =>
              setDraft({
                ...draft,
                gallery: value
              })
            }
          />
        )}

        {tab === 'About' && (
          <AboutEditor
            data={draft}
            patch={patch}
          />
        )}

        {tab === 'Contact' && (
          <ContactEditor
            data={draft}
            patch={patch}
          />
        )}

        {tab === 'Settings' && (
          <div className="settings-panel">
            <button onClick={exportData}>
              EXPORT DATA
            </button>

            <label className="import-btn">
              IMPORT DATA

              <input
                type="file"
                accept="application/json"
                onChange={importData}
                hidden
              />
            </label>
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({ data }) {
  const stats = [
    ['WINGS', data.wings.length],
    ['RESOURCES', data.resources.length],
    ['GALLERY', data.gallery.length],
    [
      'EVENTS',
      data.gallery.filter(
        (item) =>
          item.category === 'EVENTS'
      ).length
    ]
  ];

  return (
    <div className="dash-grid">
      {stats.map(([label, value]) => (
        <div
          className="dash-card"
          key={label}
        >
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}

      <div className="dash-card wide">
        <span>RECENT ACTIVITY</span>

        <p>
          Content is stored locally in this
          browser. Public pages render from the
          same localStorage dataset.
        </p>
      </div>
    </div>
  );
}

/* =========================
   INPUT COMPONENT
========================= */

function Input({
  label,
  value,
  onChange,
  multi = false
}) {
  return (
    <label className="editor-field">
      <span>{label}</span>

      {multi ? (
        <textarea
          value={value || ''}
          onChange={(e) =>
            onChange(e.target.value)
          }
        />
      ) : (
        <input
          value={value || ''}
          onChange={(e) =>
            onChange(e.target.value)
          }
        />
      )}
    </label>
  );
}

/* =========================
   HOME EDITOR
========================= */

function HomeEditor({ data, patch }) {
  return (
    <div className="editor">
      <Input
        label="Hero title"
        value={data.hero.title}
        onChange={(value) =>
          patch(['hero', 'title'], value)
        }
      />

      <Input
        label="Hero description"
        value={data.hero.description}
        onChange={(value) =>
          patch(
            ['hero', 'description'],
            value
          )
        }
        multi
      />

      <Input
        label="CTA text"
        value={data.hero.cta}
        onChange={(value) =>
          patch(['hero', 'cta'], value)
        }
      />

      <Input
        label="Intro title"
        value={data.intro.title}
        onChange={(value) =>
          patch(['intro', 'title'], value)
        }
      />

      <Input
        label="Intro description"
        value={data.intro.description}
        onChange={(value) =>
          patch(
            ['intro', 'description'],
            value
          )
        }
        multi
      />
    </div>
  );
}

/* =========================
   WINGS EDITOR
========================= */

function WingsEditor({
  data,
  setData
}) {
  return (
    <div className="editor-list">
      {data.wings.map((wing, index) => (
        <div
          className="edit-row"
          key={wing.id}
        >
          <Input
            label="Name"
            value={wing.name}
            onChange={(value) => {
              const wings = structuredClone(
                data.wings
              );

              wings[index].name = value;

              setData({
                ...data,
                wings
              });
            }}
          />

          <Input
            label="Description"
            value={wing.description}
            onChange={(value) => {
              const wings = structuredClone(
                data.wings
              );

              wings[index].description =
                value;

              setData({
                ...data,
                wings
              });
            }}
            multi
          />

          <Input
            label="Accent"
            value={wing.accent}
            onChange={(value) => {
              const wings = structuredClone(
                data.wings
              );

              wings[index].accent = value;

              setData({
                ...data,
                wings
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* =========================
   LIST EDITOR
========================= */

function ListEditor({
  title,
  data,
  setData
}) {
  const add = () => {
    setData([
      ...data,
      {
        id: Date.now(),
        title: 'New item',
        description: 'Edit description',
        category: 'EVENTS',
        date: 'Editable date',
        type: 'RESOURCE',
        image: ''
      }
    ]);
  };

  const updateItem = (
    index,
    key,
    value
  ) => {
    const next = structuredClone(data);

    next[index][key] = value;

    setData(next);
  };

  const deleteItem = (index) => {
    setData(
      data.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  };

  return (
    <div className="editor-list">
      <button
        className="add-btn"
        onClick={add}
      >
        + ADD {title.toUpperCase()}
      </button>

      {data.map((item, index) => (
        <div
          className="edit-row"
          key={item.id}
        >
          <Input
            label="Title"
            value={item.title}
            onChange={(value) =>
              updateItem(
                index,
                'title',
                value
              )
            }
          />

          <Input
            label="Category"
            value={item.category}
            onChange={(value) =>
              updateItem(
                index,
                'category',
                value
              )
            }
          />

          <Input
            label="Description"
            value={item.description}
            onChange={(value) =>
              updateItem(
                index,
                'description',
                value
              )
            }
            multi
          />

          <Input
            label="Image / URL"
            value={item.image}
            onChange={(value) =>
              updateItem(
                index,
                'image',
                value
              )
            }
          />

          <Input
            label="Resource URL"
            value={item.url}
            onChange={(value) =>
              updateItem(
                index,
                'url',
                value
              )
            }
          />

          <button
            type="button"
            onClick={() =>
              deleteItem(index)
            }
          >
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
}

/* =========================
   ABOUT EDITOR
========================= */

function AboutEditor({
  data,
  patch
}) {
  return (
    <div className="editor">
      <Input
        label="About"
        value={data.about.text}
        onChange={(value) =>
          patch(
            ['about', 'text'],
            value
          )
        }
        multi
      />

      <Input
        label="Mission"
        value={data.about.mission}
        onChange={(value) =>
          patch(
            ['about', 'mission'],
            value
          )
        }
        multi
      />

      <Input
        label="Vision"
        value={data.about.vision}
        onChange={(value) =>
          patch(
            ['about', 'vision'],
            value
          )
        }
        multi
      />
    </div>
  );
}

/* =========================
   CONTACT EDITOR
========================= */

function ContactEditor({
  data,
  patch
}) {
  return (
    <div className="editor">
      <Input
        label="Address"
        value={data.contact.address}
        onChange={(value) =>
          patch(
            ['contact', 'address'],
            value
          )
        }
        multi
      />

      <Input
        label="Email"
        value={data.contact.email}
        onChange={(value) =>
          patch(
            ['contact', 'email'],
            value
          )
        }
      />

      <Input
        label="Phone"
        value={data.contact.phone}
        onChange={(value) =>
          patch(
            ['contact', 'phone'],
            value
          )
        }
      />

      <Input
        label="Map embed URL"
        value={data.contact.mapUrl}
        onChange={(value) =>
          patch(
            ['contact', 'mapUrl'],
            value
          )
        }
      />

      <Input
        label="Instagram"
        value={data.social.instagram}
        onChange={(value) =>
          patch(
            ['social', 'instagram'],
            value
          )
        }
      />

      <Input
        label="LinkedIn"
        value={data.social.linkedin}
        onChange={(value) =>
          patch(
            ['social', 'linkedin'],
            value
          )
        }
      />

      <Input
        label="GitHub"
        value={data.social.github}
        onChange={(value) =>
          patch(
            ['social', 'github'],
            value
          )
        }
      />

      <Input
        label="YouTube"
        value={data.social.youtube}
        onChange={(value) =>
          patch(
            ['social', 'youtube'],
            value
          )
        }
      />
    </div>
  );
}