import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DEFAULT_DATA } from '../../data/siteData';
import { fetchApi, resolveAssetUrl } from '../../utils/api';

const tabs = [
  'Dashboard',
  'Home',
  'Wings',
  'Events',
  'Resources',
  'Gallery',
  'About',
  'Contact',
  'Settings'
];

export default function Admin({ data }) {
  const [tab, setTab] = useState('Dashboard');
  const [draft, setDraft] = useState(() => structuredClone(data || DEFAULT_DATA));

  useEffect(() => {
    setDraft(structuredClone(data || DEFAULT_DATA));
  }, [data]);

  if (sessionStorage.getItem('admin-auth') !== '1' || !sessionStorage.getItem('orbit_token')) {
    return <Navigate to="/admin/login" replace />;
  }

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

  const commit = async (content = draft) => {
    try {
      await fetchApi('/admin/site', {
        method: 'PUT',
        body: JSON.stringify(content),
      });

      setDraft(structuredClone(content));
      window.dispatchEvent(new Event('site-data-updated'));
      alert('Site content saved successfully.');
      return true;
    } catch (error) {
      alert(`Failed to save: ${error.message}`);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin-auth');
    sessionStorage.removeItem('orbit_token');
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
    if (window.confirm('Reset site content to its default values?')) {
      commit(structuredClone(DEFAULT_DATA));
    }
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
              ORBIT CMS
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
          Admin-only content management. Changes are saved to the backend database.
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

        {tab === 'Events' && (
          <EventsEditor
            events={draft.gallery.filter((item) => item.category === 'EVENTS')}
            wings={draft.wings}
            onSave={(events) => {
              const next = {
                ...draft,
                gallery: [
                  ...draft.gallery.filter((item) => item.category !== 'EVENTS'),
                  ...events,
                ],
              };
              return commit(next);
            }}
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
          Site content and wing coordinators are stored in the backend database.
          Uploaded event pictures are stored there as well.
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

          <Input
            label="Wing coordinator"
            value={wing.coordinator}
            onChange={(value) => {
              const wings = structuredClone(data.wings);
              wings[index].coordinator = value;
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

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetchApi('/admin/uploads', {
        method: 'POST',
        body: formData,
      });

      updateItem(index, 'image', response.url);
    } catch (error) {
      alert('Failed to upload image: ' + error.message);
    } finally {
      event.target.value = '';
    }
  };

  const updateItem = (index, key, value) => {
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

          <input
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={(e) => handleImageUpload(e, index)}
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

function EventsEditor({ events, wings, onSave }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(() => createEventForm(wings));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const selectedWing = wings.find((wing) => wing.id === form.wingId);

  const startNewEvent = () => {
    setEditingId(null);
    setForm(createEventForm(wings));
    setError('');
  };

  const editEvent = (event) => {
    setEditingId(event.id);
    setForm({
      title: event.title || '',
      date: event.date || '',
      description: event.description || '',
      image: event.image || '',
      wingId: event.wingId || wings[0]?.id || '',
    });
    setError('');
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError('');
    const body = new FormData();
    body.append('file', file);

    try {
      const result = await fetchApi('/admin/uploads', {
        method: 'POST',
        body,
      });
      updateField('image', result.url);
    } catch (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`);
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  };

  const saveEvent = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.title.trim() || !form.date.trim() || !form.description.trim()) {
      setError('Enter the event title, date, and description.');
      return;
    }
    if (!form.image) {
      setError('Upload an event picture before saving.');
      return;
    }
    if (wings.length && !form.wingId) {
      setError('Choose the wing responsible for this event.');
      return;
    }

    const existing = events.find((item) => item.id === editingId);
    const item = {
      ...(existing || {}),
      id: editingId ?? Date.now(),
      title: form.title.trim(),
      date: form.date.trim(),
      description: form.description.trim(),
      category: 'EVENTS',
      image: form.image,
      wingId: form.wingId,
    };
    const nextEvents = editingId === null
      ? [...events, item]
      : events.map((current) => current.id === editingId ? item : current);

    setBusy(true);
    try {
      if (!await onSave(nextEvents)) return;

      const oldImageId = getStoredImageId(existing?.image);
      const newImageId = getStoredImageId(item.image);
      if (oldImageId && oldImageId !== newImageId) {
        await fetchApi(`/admin/uploads/${oldImageId}`, { method: 'DELETE' });
      }

      startNewEvent();
    } catch (saveError) {
      setError(`Event saved, but the previous image could not be removed: ${saveError.message}`);
    } finally {
      setBusy(false);
    }
  };

  const deleteEvent = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    setError('');
    setBusy(true);
    try {
      if (!await onSave(events.filter((event) => event.id !== item.id))) return;

      const imageId = getStoredImageId(item.image);
      if (imageId) {
        await fetchApi(`/admin/uploads/${imageId}`, { method: 'DELETE' });
      }
      if (editingId === item.id) startNewEvent();
    } catch (deleteError) {
      setError(`Event was removed, but its picture could not be deleted: ${deleteError.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="events-admin">
      <form className="event-form" onSubmit={saveEvent}>
        <div className="event-form-heading">
          <div>
            <span className="eyebrow">EVENT MANAGEMENT</span>
            <h2>{editingId === null ? 'ADD AN EVENT' : 'UPDATE EVENT'}</h2>
          </div>
          {editingId !== null && (
            <button type="button" className="event-secondary" onClick={startNewEvent}>
              CANCEL EDIT
            </button>
          )}
        </div>

        <div className="event-form-grid">
          <Input label="Event title" value={form.title} onChange={(value) => updateField('title', value)} />
          <Input label="Event date" value={form.date} onChange={(value) => updateField('date', value)} />
          <label className="editor-field">
            <span>Wing</span>
            <select value={form.wingId} onChange={(event) => updateField('wingId', event.target.value)}>
              <option value="">Select a wing</option>
              {wings.map((wing) => (
                <option key={wing.id} value={wing.id}>{wing.name}</option>
              ))}
            </select>
          </label>
          <div className="event-coordinator">
            <span>Wing coordinator</span>
            <strong>{selectedWing?.coordinator || 'Set the coordinator in the Wings tab'}</strong>
          </div>
          <div className="event-description">
            <Input label="Description" value={form.description} onChange={(value) => updateField('description', value)} multi />
          </div>
          <label className="editor-field event-image-upload">
            <span>Event picture (PNG, JPG, WEBP, GIF)</span>
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={uploadImage} />
          </label>
          {form.image && (
            <img className="event-image-preview" src={resolveAssetUrl(form.image)} alt="Event preview" />
          )}
        </div>

        {error && <p className="event-form-error" role="alert">{error}</p>}
        <button className="event-primary" type="submit" disabled={busy}>
          {busy ? 'SAVING...' : editingId === null ? 'ADD EVENT' : 'UPDATE EVENT'}
        </button>
      </form>

      <section className="event-records" aria-labelledby="event-records-heading">
        <h2 id="event-records-heading">SAVED EVENTS ({events.length})</h2>
        {events.length === 0 && <p>No events yet. Add an event above.</p>}
        {events.map((event) => {
          const wing = wings.find((item) => item.id === event.wingId);
          return (
            <article className="event-record" key={event.id}>
              {event.image && <img src={resolveAssetUrl(event.image)} alt="" />}
              <div className="event-record-details">
                <strong>{event.title}</strong>
                <span>{event.date} · {wing?.name || 'No wing assigned'}</span>
                <span>Coordinator: {wing?.coordinator || 'Not set'}</span>
              </div>
              <div className="event-record-actions">
                <button type="button" onClick={() => editEvent(event)} disabled={busy}>EDIT</button>
                <button type="button" onClick={() => deleteEvent(event)} disabled={busy}>DELETE</button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function createEventForm(wings) {
  return {
    title: '',
    date: '',
    description: '',
    image: '',
    wingId: wings[0]?.id || '',
  };
}

function getStoredImageId(image) {
  return image?.match(/^\/api\/images\/([0-9a-f-]+)$/i)?.[1] || null;
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