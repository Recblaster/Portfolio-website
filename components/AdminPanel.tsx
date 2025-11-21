
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, Briefcase, Cpu } from 'lucide-react';
import { Project, Skill } from '../types';

interface AdminPanelProps {
  onAddProject: (project: Project) => void;
  onAddSkill: (skill: Skill) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddProject, onAddSkill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'project' | 'skill'>('project');

  // Project Form State
  const [pTitle, setPTitle] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pTech, setPTech] = useState('');
  const [pCategory, setPCategory] = useState<Project['category']>('Frontend');
  const [pImg, setPImg] = useState('https://picsum.photos/800/600?random=' + Math.random());

  // Skill Form State
  const [sName, setSName] = useState('');
  const [sLevel, setSLevel] = useState(50);
  const [sCategory, setSCategory] = useState<Skill['category']>('Languages');

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now().toString(),
      title: pTitle,
      description: pDesc,
      techStack: pTech.split(',').map(t => t.trim()),
      imageUrl: pImg,
      link: '#',
      category: pCategory
    };
    onAddProject(newProject);
    console.log("New Project JSON (Copy to constants.tsx):", JSON.stringify(newProject, null, 2));
    
    // Reset
    setPTitle('');
    setPDesc('');
    setPTech('');
    alert('Project Added! (Check console for JSON)');
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Note: We can't dynamically assign Lucide icons easily from string input in this demo, 
    // so we'll use a generic one or handle it in the parent if needed. 
    // For this specific UI, we passed the icon component itself in types.
    // We will fix this by using a placeholder in the types or handling it gracefully.
    // Since 'icon' in Skill is 'any', we'll pass null or a default for now.
    
    const newSkill: Skill = {
      name: sName,
      level: sLevel,
      category: sCategory,
      icon: Cpu // Default icon
    };
    onAddSkill(newSkill);
    console.log("New Skill JSON (Copy to constants.tsx):", JSON.stringify(newSkill, null, 2));

    // Reset
    setSName('');
    setSLevel(50);
    alert('Skill Added! (Check console for JSON)');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-slate-800/80 backdrop-blur text-slate-400 hover:text-white p-3 rounded-full border border-slate-700 shadow-lg hover:bg-accent hover:border-accent transition-all group"
        title="Admin / Add Data"
      >
        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-6 bg-accent rounded-full"></span>
                  Update Arsenal
                </h2>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-800">
                <button
                  onClick={() => setActiveTab('project')}
                  className={`flex-1 py-4 font-medium text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'project' ? 'text-accent bg-accent/5 border-b-2 border-accent' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <Briefcase size={16} /> Add Project
                </button>
                <button
                  onClick={() => setActiveTab('skill')}
                  className={`flex-1 py-4 font-medium text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'skill' ? 'text-accent bg-accent/5 border-b-2 border-accent' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <Cpu size={16} /> Add Skill
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {activeTab === 'project' ? (
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Title</label>
                      <input required value={pTitle} onChange={e => setPTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-accent outline-none" placeholder="Project Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Description</label>
                      <textarea required value={pDesc} onChange={e => setPDesc(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-accent outline-none h-24" placeholder="Brief description..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Category</label>
                         <select value={pCategory} onChange={e => setPCategory(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-accent outline-none">
                           <option>Frontend</option>
                           <option>Fullstack</option>
                           <option>AI/ML</option>
                           <option>Mobile</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Tech Stack (comma values)</label>
                         <input value={pTech} onChange={e => setPTech(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-accent outline-none" placeholder="React, Node, ..." />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-accent text-slate-900 font-bold py-3 rounded hover:bg-accentHover transition-colors flex items-center justify-center gap-2">
                      <Save size={18} /> Save Project
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSkillSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Skill Name</label>
                      <input required value={sName} onChange={e => setSName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-accent outline-none" placeholder="e.g. Rust" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Proficiency ({sLevel}%)</label>
                      <input type="range" min="0" max="100" value={sLevel} onChange={e => setSLevel(Number(e.target.value))} className="w-full accent-accent" />
                    </div>
                    <div>
                       <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Category</label>
                       <select value={sCategory} onChange={e => setSCategory(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-accent outline-none">
                         <option>Languages</option>
                         <option>Frameworks</option>
                         <option>Tools</option>
                       </select>
                    </div>
                    <button type="submit" className="w-full bg-accent text-slate-900 font-bold py-3 rounded hover:bg-accentHover transition-colors flex items-center justify-center gap-2">
                      <Save size={18} /> Save Skill
                    </button>
                  </form>
                )}
              </div>
              
              <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-500 text-center font-mono">
                 * Changes are temporary. Copy JSON from console to persist.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
