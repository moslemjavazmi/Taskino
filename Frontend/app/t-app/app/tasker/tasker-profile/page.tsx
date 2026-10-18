// // // //Frontend/app/tasker-app/tasker/tasker-profile/page.tsx

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@packages/auth-store/src/useAuth';
// import { apiClient } from '@packages/api-client';
// import { motion } from 'framer-motion';
// import {
//   FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaCity, FaSave,
//   FaInfoCircle, FaGripVertical
// } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// // ---------- Types ----------
// interface Skill {
//   id: string;
//   name: string;
//   icon?: string;
// }

// interface SelectedSkill {
//   skillId: string;
//   skillName: string;
//   level: number;   // 1 = highest priority
// }

// // ---------- Drag & Drop Item ----------
// const ItemType = 'SELECTED_SKILL';

// interface DraggableSkillProps {
//   skill: SelectedSkill;
//   index: number;
//   moveSkill: (dragIndex: number, hoverIndex: number) => void;
//   removeSkill: (skillId: string) => void;
// }

// const DraggableSkill: React.FC<DraggableSkillProps> = ({ skill, index, moveSkill, removeSkill }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [{ handlerId }, drop] = useDrop({
//     accept: ItemType,
//     collect(monitor) {
//       return { handlerId: monitor.getHandlerId() };
//     },
//     hover(item: any, monitor) {
//       if (!ref.current) return;
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       if (dragIndex === hoverIndex) return;
//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
//       moveSkill(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: () => ({ id: skill.skillId, index }),
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));
//   const opacity = isDragging ? 0.5 : 1;

//   return (
//     <div
//       ref={ref}
//       style={{ opacity }}
//       className="flex items-center justify-between p-2 bg-gray-50 rounded mb-2 border border-gray-200"
//       data-handler-id={handlerId}
//     >
//       <div className="flex items-center gap-2 cursor-move">
//         <FaGripVertical className="text-gray-400" />
//         <span>{skill.skillName}</span>
//         <span className="text-xs text-gray-500 ml-2">(Priority: {skill.level})</span>
//       </div>
//       <button
//         type="button"
//         onClick={() => removeSkill(skill.skillId)}
//         className="text-red-500 hover:text-red-700 text-sm"
//       >
//         Remove
//       </button>
//     </div>
//   );
// };

// // ---------- Main Component ----------
// export default function TaskerSetupPage() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
//   const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
//   const [form, setForm] = useState({
//     name: '',
//     address: '',       // work address
//     hourlyRate: '',
//     serviceAreas: '',
//   });
//   const [phone] = useState(user?.mobile || '');

//   // Fetch all skills and user's profile with existing skills
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 1. Get all skills
//         const skillsRes = await apiClient.get('/api/user/skills');
//         setAvailableSkills(skillsRes.data);

//         // 2. Get user profile (includes selected skills with level)
//         const profileRes = await apiClient.get('/api/user/profile/me');
//         const profile = profileRes.data;
//         // Extract existing skills (TaskerSkill) from profile
//         const existingSkills: SelectedSkill[] = (profile.skills || []).map((ts: any, idx: number) => ({
//           skillId: ts.skillId,
//           skillName: ts.skill.name,
//           level: ts.level || idx + 1,
//         }));
//         setSelectedSkills(existingSkills.sort((a, b) => a.level - b.level));

//         // 3. Fill form fields
//         setForm({
//           name: profile.name || '',
//           address: profile.address || '',
//           hourlyRate: profile.taskerProfile?.hourlyRate ? String(profile.taskerProfile.hourlyRate) : '',
//           serviceAreas: profile.taskerProfile?.serviceAreas?.join(', ') || '',
//         });
//       } catch (err) {
//         console.error('Error loading profile data:', err);
//         toast.error('Failed to load profile data');
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle skill selection/deselection
//   const toggleSkill = (skill: Skill) => {
//     const alreadySelected = selectedSkills.find(s => s.skillId === skill.id);
//     if (alreadySelected) {
//       // Remove
//       const newSelected = selectedSkills.filter(s => s.skillId !== skill.id);
//       // Recalculate levels (1..N)
//       const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
//       setSelectedSkills(updated);
//     } else {
//       // Add with highest level (last)
//       const newLevel = selectedSkills.length + 1;
//       const newSkill: SelectedSkill = {
//         skillId: skill.id,
//         skillName: skill.name,
//         level: newLevel,
//       };
//       const newSelected = [...selectedSkills, newSkill];
//       setSelectedSkills(newSelected);
//     }
//   };

//   // Remove skill (also called from draggable remove button)
//   const removeSkill = (skillId: string) => {
//     const newSelected = selectedSkills.filter(s => s.skillId !== skillId);
//     const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
//     setSelectedSkills(updated);
//   };

//   // Move skill (drag & drop)
//   const moveSkill = useCallback((dragIndex: number, hoverIndex: number) => {
//     const newSelected = [...selectedSkills];
//     const dragged = newSelected[dragIndex];
//     newSelected.splice(dragIndex, 1);
//     newSelected.splice(hoverIndex, 0, dragged);
//     // Recalculate levels
//     const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
//     setSelectedSkills(updated);
//   }, [selectedSkills]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.name.trim()) {
//       toast.error('Full name is required');
//       return;
//     }
//     if (!form.hourlyRate || parseInt(form.hourlyRate) <= 0) {
//       toast.error('Please enter a valid hourly rate');
//       return;
//     }
//     if (!form.serviceAreas.trim()) {
//       toast.error('At least one service area is required');
//       return;
//     }

//     setLoading(true);
//     try {
//       // 1. Update basic profile
//       await apiClient.put('/api/user/profile/me', {
//         name: form.name,
//         address: form.address,
//       });

//       // 2. Update Tasker profile
//       await apiClient.put('/api/user/tasker/me', {
//         hourlyRate: parseInt(form.hourlyRate),
//         serviceAreas: form.serviceAreas.split(',').map(s => s.trim()),
//         isActive: true,
//       });

//       // 3. Update skills with priority (level)
//       const skillsPayload = selectedSkills.map(s => ({
//         skillId: s.skillId,
//         level: s.level,
//       }));
//       await apiClient.put('/api/user/skills/me', { skills: skillsPayload });

//       toast.success('Profile successfully saved!');
//       router.push('/tasks');
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to save profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
//       </div>
//     );
//   }

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
//         <div className="max-w-3xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-2xl shadow-2xl p-8"
//           >
//             <div className="flex items-center justify-center mb-6">
//               <div className="bg-green-400 p-3 rounded-full">
//                 <FaUser className="text-2xl text-white" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold text-center mb-2">Complete Your Tasker Profile</h2>
//             <p className="text-gray-600 text-center mb-8">
//               Tell clients about yourself and your skills.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-left text-gray-700 mb-1">Full Name *</label>
//                 <div className="relative">
//                   <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Phone (disabled) */}
//               <div>
//                 <label className="block text-left text-gray-700 mb-1">Phone Number</label>
//                 <div className="relative">
//                   <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     value={phone}
//                     disabled
//                     className="w-full pl-10 pr-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1 text-left">
//                   Your phone number is verified and cannot be changed here.
//                 </p>
//               </div>

//               {/* Work Address */}
//               <div>
//                 <label className="block text-left text-gray-700 mb-1">
//                   Work Address (where you provide services)
//                 </label>
//                 <div className="relative">
//                   <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
//                   <textarea
//                     name="address"
//                     rows={2}
//                     value={form.address}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                     placeholder="Your office or service location"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1 text-left">
//                   Clients will see this address as your service location.
//                 </p>
//               </div>

//               {/* Hourly Rate */}
//               <div>
//                 <label className="block text-left text-gray-700 mb-1">Hourly Rate (Toman) *</label>
//                 <div className="relative">
//                   <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="number"
//                     name="hourlyRate"
//                     value={form.hourlyRate}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                     placeholder="e.g. 250000"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Service Areas */}
//               <div>
//                 <label className="block text-left text-gray-700 mb-1">
//                   Service Areas (comma separated) *
//                 </label>
//                 <div className="relative">
//                   <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     name="serviceAreas"
//                     value={form.serviceAreas}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                     placeholder="e.g. Tehran, Karaj, Shiraz"
//                     required
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1 text-left">
//                   Separate city names with commas.
//                 </p>
//               </div>

//               {/* Skills with Priority (Drag & Drop) */}
//               <div className="border-t pt-4">
//                 <label className="block text-left text-gray-700 mb-2 font-semibold">
//                   Your Skills & Expertise <FaInfoCircle className="inline ml-1 text-gray-400" />
//                 </label>
//                 <p className="text-sm text-gray-500 mb-3">
//                   Select all skills that apply to you. Then drag & drop to set priority (higher = more important).
//                 </p>

//                 {/* Available skills (checkboxes) */}
//                 <div className="grid grid-cols-2 gap-2 mb-4 max-h-40 overflow-y-auto p-2 border rounded bg-gray-50">
//                   {availableSkills.map(skill => {
//                     const isSelected = selectedSkills.some(s => s.skillId === skill.id);
//                     return (
//                       <label key={skill.id} className="flex items-center gap-2 text-sm">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => toggleSkill(skill)}
//                         />
//                         {skill.name}
//                       </label>
//                     );
//                   })}
//                 </div>

//                 {/* Selected skills with drag & drop */}
//                 {selectedSkills.length > 0 && (
//                   <div className="mt-2">
//                     <p className="text-sm font-medium text-gray-700 mb-2">Selected skills (drag to reorder):</p>
//                     <div className="bg-gray-50 p-2 rounded">
//                       {selectedSkills.map((skill, idx) => (
//                         <DraggableSkill
//                           key={skill.skillId}
//                           skill={skill}
//                           index={idx}
//                           moveSkill={moveSkill}
//                           removeSkill={removeSkill}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2">
//                       Priority 1 = highest importance. Drag items to change order.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Guidance */}
//               <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
//                 <p className="font-semibold">📌 Tips for a great profile:</p>
//                 <ul className="list-disc list-inside mt-1 space-y-1">
//                   <li>Add a professional photo later in your profile settings.</li>
//                   <li>List only skills you are confident in.</li>
//                   <li>Set your service areas precisely to get relevant job offers.</li>
//                   <li>Your hourly rate should reflect your experience and market average.</li>
//                 </ul>
//               </div>

//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
//                 >
//                   <FaSave /> {loading ? 'Saving...' : 'Save & Continue'}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// // 'use client';

// // import { useState, useEffect, useCallback } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@packages/auth-store/src/useAuth';
// // import { apiClient } from '@packages/api-client';
// // import { motion } from 'framer-motion';
// // import {
// //   FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaCity, FaSave,
// //   FaInfoCircle, FaGripVertical
// // } from 'react-icons/fa';
// // import toast from 'react-hot-toast';
// // import { DndProvider, useDrag, useDrop } from 'react-dnd';
// // import { HTML5Backend } from 'react-dnd-html5-backend';

// // // ---------- Types ----------
// // interface Skill {
// //   id: string;
// //   name: string;
// //   icon?: string;
// // }

// // interface SelectedSkill {
// //   skillId: string;
// //   skillName: string;
// //   level: number;   // 1 = highest priority
// // }

// // // ---------- Drag & Drop Item ----------
// // const ItemType = 'SELECTED_SKILL';

// // interface DraggableSkillProps {
// //   skill: SelectedSkill;
// //   index: number;
// //   moveSkill: (dragIndex: number, hoverIndex: number) => void;
// //   removeSkill: (skillId: string) => void;
// // }

// // const DraggableSkill: React.FC<DraggableSkillProps> = ({ skill, index, moveSkill, removeSkill }) => {
// //   const ref = React.useRef<HTMLDivElement>(null);
// //   const [{ handlerId }, drop] = useDrop({
// //     accept: ItemType,
// //     collect(monitor) {
// //       return { handlerId: monitor.getHandlerId() };
// //     },
// //     hover(item: any, monitor) {
// //       if (!ref.current) return;
// //       const dragIndex = item.index;
// //       const hoverIndex = index;
// //       if (dragIndex === hoverIndex) return;
// //       const hoverBoundingRect = ref.current?.getBoundingClientRect();
// //       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
// //       const clientOffset = monitor.getClientOffset();
// //       const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
// //       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
// //       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
// //       moveSkill(dragIndex, hoverIndex);
// //       item.index = hoverIndex;
// //     },
// //   });

// //   const [{ isDragging }, drag] = useDrag({
// //     type: ItemType,
// //     item: () => ({ id: skill.skillId, index }),
// //     collect: (monitor) => ({
// //       isDragging: monitor.isDragging(),
// //     }),
// //   });

// //   drag(drop(ref));
// //   const opacity = isDragging ? 0.5 : 1;

// //   return (
// //     <div
// //       ref={ref}
// //       style={{ opacity }}
// //       className="flex items-center justify-between p-2 bg-gray-50 rounded mb-2 border border-gray-200"
// //       data-handler-id={handlerId}
// //     >
// //       <div className="flex items-center gap-2 cursor-move">
// //         <FaGripVertical className="text-gray-400" />
// //         <span>{skill.skillName}</span>
// //         <span className="text-xs text-gray-500 ml-2">(Priority: {skill.level})</span>
// //       </div>
// //       <button
// //         type="button"
// //         onClick={() => removeSkill(skill.skillId)}
// //         className="text-red-500 hover:text-red-700 text-sm"
// //       >
// //         Remove
// //       </button>
// //     </div>
// //   );
// // };

// // // ---------- Main Component ----------
// // export default function TaskerSetupPage() {
// //   const { user } = useAuth();
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);
// //   const [initialLoading, setInitialLoading] = useState(true);
// //   const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
// //   const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
// //   const [form, setForm] = useState({
// //     name: '',
// //     address: '',       // work address
// //     hourlyRate: '',
// //     serviceAreas: '',
// //   });
// //   const [phone] = useState(user?.mobile || '');

// //   // Fetch all skills and user's profile with existing skills
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // 1. Get all skills
// //         const skillsRes = await apiClient.get('/api/user/skills');
// //         setAvailableSkills(skillsRes.data);

// //         // 2. Get user profile (includes selected skills with level)
// //         const profileRes = await apiClient.get('/api/user/profile/me');
// //         const profile = profileRes.data;
// //         // Extract existing skills (TaskerSkill) from profile
// //         const existingSkills: SelectedSkill[] = (profile.skills || []).map((ts: any, idx: number) => ({
// //           skillId: ts.skillId,
// //           skillName: ts.skill.name,
// //           level: ts.level || idx + 1,
// //         }));
// //         setSelectedSkills(existingSkills.sort((a, b) => a.level - b.level));

// //         // 3. Fill form fields
// //         setForm({
// //           name: profile.name || '',
// //           address: profile.address || '',
// //           hourlyRate: profile.taskerProfile?.hourlyRate ? String(profile.taskerProfile.hourlyRate) : '',
// //           serviceAreas: profile.taskerProfile?.serviceAreas?.join(', ') || '',
// //         });
// //       } catch (err) {
// //         console.error('Error loading profile data:', err);
// //         toast.error('Failed to load profile data');
// //       } finally {
// //         setInitialLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // Handle skill selection/deselection
// //   const toggleSkill = (skill: Skill) => {
// //     const alreadySelected = selectedSkills.find(s => s.skillId === skill.id);
// //     if (alreadySelected) {
// //       // Remove
// //       const newSelected = selectedSkills.filter(s => s.skillId !== skill.id);
// //       // Recalculate levels (1..N)
// //       const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
// //       setSelectedSkills(updated);
// //     } else {
// //       // Add with highest level (last)
// //       const newLevel = selectedSkills.length + 1;
// //       const newSkill: SelectedSkill = {
// //         skillId: skill.id,
// //         skillName: skill.name,
// //         level: newLevel,
// //       };
// //       const newSelected = [...selectedSkills, newSkill];
// //       setSelectedSkills(newSelected);
// //     }
// //   };

// //   // Remove skill (also called from draggable remove button)
// //   const removeSkill = (skillId: string) => {
// //     const newSelected = selectedSkills.filter(s => s.skillId !== skillId);
// //     const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
// //     setSelectedSkills(updated);
// //   };

// //   // Move skill (drag & drop)
// //   const moveSkill = useCallback((dragIndex: number, hoverIndex: number) => {
// //     const newSelected = [...selectedSkills];
// //     const dragged = newSelected[dragIndex];
// //     newSelected.splice(dragIndex, 1);
// //     newSelected.splice(hoverIndex, 0, dragged);
// //     // Recalculate levels
// //     const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
// //     setSelectedSkills(updated);
// //   }, [selectedSkills]);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!form.name.trim()) {
// //       toast.error('Full name is required');
// //       return;
// //     }
// //     if (!form.hourlyRate || parseInt(form.hourlyRate) <= 0) {
// //       toast.error('Please enter a valid hourly rate');
// //       return;
// //     }
// //     if (!form.serviceAreas.trim()) {
// //       toast.error('At least one service area is required');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // 1. Update basic profile
// //       await apiClient.put('/api/user/profile/me', {
// //         name: form.name,
// //         address: form.address,
// //       });

// //       // 2. Update Tasker profile
// //       await apiClient.put('/api/user/tasker/me', {
// //         hourlyRate: parseInt(form.hourlyRate),
// //         serviceAreas: form.serviceAreas.split(',').map(s => s.trim()),
// //         isActive: true,
// //       });

// //       // 3. Update skills with priority (level)
// //       const skillsPayload = selectedSkills.map(s => ({
// //         skillId: s.skillId,
// //         level: s.level,
// //       }));
// //       await apiClient.put('/api/user/skills/me', { skills: skillsPayload });

// //       toast.success('Profile successfully saved!');
// //       router.push('/tasks');
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('Failed to save profile');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (initialLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
// //         <div className="max-w-3xl mx-auto">
// //           <motion.div
// //             initial={{ opacity: 0, y: 50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="bg-white rounded-2xl shadow-2xl p-8"
// //           >
// //             <div className="flex items-center justify-center mb-6">
// //               <div className="bg-green-400 p-3 rounded-full">
// //                 <FaUser className="text-2xl text-white" />
// //               </div>
// //             </div>
// //             <h2 className="text-2xl font-bold text-center mb-2">Complete Your Tasker Profile</h2>
// //             <p className="text-gray-600 text-center mb-8">
// //               Tell clients about yourself and your skills.
// //             </p>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               {/* Full Name */}
// //               <div>
// //                 <label className="block text-left text-gray-700 mb-1">Full Name *</label>
// //                 <div className="relative">
// //                   <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={form.name}
// //                     onChange={handleChange}
// //                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* Phone (disabled) */}
// //               <div>
// //                 <label className="block text-left text-gray-700 mb-1">Phone Number</label>
// //                 <div className="relative">
// //                   <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     value={phone}
// //                     disabled
// //                     className="w-full pl-10 pr-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
// //                   />
// //                 </div>
// //                 <p className="text-xs text-gray-500 mt-1 text-left">
// //                   Your phone number is verified and cannot be changed here.
// //                 </p>
// //               </div>

// //               {/* Work Address */}
// //               <div>
// //                 <label className="block text-left text-gray-700 mb-1">
// //                   Work Address (where you provide services)
// //                 </label>
// //                 <div className="relative">
// //                   <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
// //                   <textarea
// //                     name="address"
// //                     rows={2}
// //                     value={form.address}
// //                     onChange={handleChange}
// //                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
// //                     placeholder="Your office or service location"
// //                   />
// //                 </div>
// //                 <p className="text-xs text-gray-500 mt-1 text-left">
// //                   Clients will see this address as your service location.
// //                 </p>
// //               </div>

// //               {/* Hourly Rate */}
// //               <div>
// //                 <label className="block text-left text-gray-700 mb-1">Hourly Rate (Toman) *</label>
// //                 <div className="relative">
// //                   <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <input
// //                     type="number"
// //                     name="hourlyRate"
// //                     value={form.hourlyRate}
// //                     onChange={handleChange}
// //                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
// //                     placeholder="e.g. 250000"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* Service Areas */}
// //               <div>
// //                 <label className="block text-left text-gray-700 mb-1">
// //                   Service Areas (comma separated) *
// //                 </label>
// //                 <div className="relative">
// //                   <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     name="serviceAreas"
// //                     value={form.serviceAreas}
// //                     onChange={handleChange}
// //                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
// //                     placeholder="e.g. Tehran, Karaj, Shiraz"
// //                     required
// //                   />
// //                 </div>
// //                 <p className="text-xs text-gray-500 mt-1 text-left">
// //                   Separate city names with commas.
// //                 </p>
// //               </div>

// //               {/* Skills with Priority (Drag & Drop) */}
// //               <div className="border-t pt-4">
// //                 <label className="block text-left text-gray-700 mb-2 font-semibold">
// //                   Your Skills & Expertise <FaInfoCircle className="inline ml-1 text-gray-400" />
// //                 </label>
// //                 <p className="text-sm text-gray-500 mb-3">
// //                   Select all skills that apply to you. Then drag & drop to set priority (higher = more important).
// //                 </p>

// //                 {/* Available skills (checkboxes) */}
// //                 <div className="grid grid-cols-2 gap-2 mb-4 max-h-40 overflow-y-auto p-2 border rounded bg-gray-50">
// //                   {availableSkills.map(skill => {
// //                     const isSelected = selectedSkills.some(s => s.skillId === skill.id);
// //                     return (
// //                       <label key={skill.id} className="flex items-center gap-2 text-sm">
// //                         <input
// //                           type="checkbox"
// //                           checked={isSelected}
// //                           onChange={() => toggleSkill(skill)}
// //                         />
// //                         {skill.name}
// //                       </label>
// //                     );
// //                   })}
// //                 </div>

// //                 {/* Selected skills with drag & drop */}
// //                 {selectedSkills.length > 0 && (
// //                   <div className="mt-2">
// //                     <p className="text-sm font-medium text-gray-700 mb-2">Selected skills (drag to reorder):</p>
// //                     <div className="bg-gray-50 p-2 rounded">
// //                       {selectedSkills.map((skill, idx) => (
// //                         <DraggableSkill
// //                           key={skill.skillId}
// //                           skill={skill}
// //                           index={idx}
// //                           moveSkill={moveSkill}
// //                           removeSkill={removeSkill}
// //                         />
// //                       ))}
// //                     </div>
// //                     <p className="text-xs text-gray-500 mt-2">
// //                       Priority 1 = highest importance. Drag items to change order.
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Guidance */}
// //               <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
// //                 <p className="font-semibold">📌 Tips for a great profile:</p>
// //                 <ul className="list-disc list-inside mt-1 space-y-1">
// //                   <li>Add a professional photo later in your profile settings.</li>
// //                   <li>List only skills you are confident in.</li>
// //                   <li>Set your service areas precisely to get relevant job offers.</li>
// //                   <li>Your hourly rate should reflect your experience and market average.</li>
// //                 </ul>
// //               </div>

// //               <div className="flex justify-end pt-4">
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
// //                 >
// //                   <FaSave /> {loading ? 'Saving...' : 'Save & Continue'}
// //                 </button>
// //               </div>
// //             </form>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </DndProvider>
// //   );
// // }




// frontend/app/tasker-app/src/app/tasker/tasker-profile/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react'; // ✅ added React import
import { useRouter } from 'next/navigation';
import { useAuth } from '@packages/auth-store/src/useAuth';
import { apiClient } from '@packages/api-client';
import { motion } from 'framer-motion';
import {
  FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaCity, FaSave,
  FaInfoCircle, FaGripVertical
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// ---------- Types ----------
interface Skill {
  id: string;
  name: string;
  icon?: string;
}

interface SelectedSkill {
  skillId: string;
  skillName: string;
  level: number;   // 1 = highest priority
}

// ---------- Drag & Drop Item ----------
const ItemType = 'SELECTED_SKILL';

interface DraggableSkillProps {
  skill: SelectedSkill;
  index: number;
  moveSkill: (dragIndex: number, hoverIndex: number) => void;
  removeSkill: (skillId: string) => void;
}

const DraggableSkill: React.FC<DraggableSkillProps> = ({ skill, index, moveSkill, removeSkill }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemType,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveSkill(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: () => ({ id: skill.skillId, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="flex items-center justify-between p-2 bg-gray-50 rounded mb-2 border border-gray-200"
      data-handler-id={handlerId}
    >
      <div className="flex items-center gap-2 cursor-move">
        <FaGripVertical className="text-gray-400" />
        <span>{skill.skillName}</span>
        <span className="text-xs text-gray-500 ml-2">(Priority: {skill.level})</span>
      </div>
      <button
        type="button"
        onClick={() => removeSkill(skill.skillId)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </div>
  );
};

// ---------- Main Component ----------
export default function TaskerSetupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
  const [form, setForm] = useState({
    name: '',
    address: '',       // work address
    hourlyRate: '',
    serviceAreas: '',
  });
  const [phone] = useState(user?.mobile || '');

  // Fetch all skills and user's profile with existing skills
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get all skills
        const skillsRes = await apiClient.get('/api/user/skills');
        setAvailableSkills(skillsRes.data);

        // 2. Get user profile (includes selected skills with level)
        const profileRes = await apiClient.get('/api/user/profile/me');
        const profile = profileRes.data;
        // Extract existing skills (TaskerSkill) from profile
        const existingSkills: SelectedSkill[] = (profile.skills || []).map((ts: any) => ({
          skillId: ts.skillId,
          skillName: ts.skill.name,
          level: ts.level || 1,
        }));
        // Sort by level
        existingSkills.sort((a, b) => a.level - b.level);
        setSelectedSkills(existingSkills);

        // 3. Fill form fields
        setForm({
          name: profile.name || '',
          address: profile.address || '',
          hourlyRate: profile.taskerProfile?.hourlyRate ? String(profile.taskerProfile.hourlyRate) : '',
          serviceAreas: profile.taskerProfile?.serviceAreas?.join(', ') || '',
        });
      } catch (err) {
        console.error('Error loading profile data:', err);
        toast.error('Failed to load profile data');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle skill selection/deselection
  const toggleSkill = (skill: Skill) => {
    const alreadySelected = selectedSkills.find(s => s.skillId === skill.id);
    if (alreadySelected) {
      // Remove
      const newSelected = selectedSkills.filter(s => s.skillId !== skill.id);
      // Recalculate levels (1..N)
      const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
      setSelectedSkills(updated);
    } else {
      // Add with highest level (last)
      const newLevel = selectedSkills.length + 1;
      const newSkill: SelectedSkill = {
        skillId: skill.id,
        skillName: skill.name,
        level: newLevel,
      };
      const newSelected = [...selectedSkills, newSkill];
      setSelectedSkills(newSelected);
    }
  };

  // Remove skill (also called from draggable remove button)
  const removeSkill = (skillId: string) => {
    const newSelected = selectedSkills.filter(s => s.skillId !== skillId);
    const updated = newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
    setSelectedSkills(updated);
  };

  // Move skill (drag & drop)
  const moveSkill = useCallback((dragIndex: number, hoverIndex: number) => {
    setSelectedSkills(prev => {
      const newSelected = [...prev];
      const dragged = newSelected[dragIndex];
      newSelected.splice(dragIndex, 1);
      newSelected.splice(hoverIndex, 0, dragged);
      // Recalculate levels
      return newSelected.map((s, idx) => ({ ...s, level: idx + 1 }));
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error('Full name is required');
      return;
    }
    if (!form.hourlyRate || parseInt(form.hourlyRate) <= 0) {
      toast.error('Please enter a valid hourly rate');
      return;
    }
    if (!form.serviceAreas.trim()) {
      toast.error('At least one service area is required');
      return;
    }

    setLoading(true);
    try {
      // 1. Update basic profile
      await apiClient.put('/api/user/profile/me', {
        name: form.name,
        address: form.address,
      });

      // 2. Update Tasker profile
      await apiClient.put('/api/user/tasker/me', {
        hourlyRate: parseInt(form.hourlyRate),
        serviceAreas: form.serviceAreas.split(',').map(s => s.trim()),
        isActive: true,
      });

      // 3. Update skills with priority (level)
      const skillsPayload = selectedSkills.map(s => ({
        skillId: s.skillId,
        level: s.level,
      }));
      await apiClient.put('/api/user/skills/me', { skills: skillsPayload });

      toast.success('Profile successfully saved!');
      router.push('/tasks');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-400 p-3 rounded-full">
                <FaUser className="text-2xl text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Complete Your Tasker Profile</h2>
            <p className="text-gray-600 text-center mb-8">
              Tell clients about yourself and your skills.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-left text-gray-700 mb-1">Full Name *</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              {/* Phone (disabled) */}
              <div>
                <label className="block text-left text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-left">
                  Your phone number is verified and cannot be changed here.
                </p>
              </div>

              {/* Work Address */}
              <div>
                <label className="block text-left text-gray-700 mb-1">
                  Work Address (where you provide services)
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="address"
                    rows={2}
                    value={form.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Your office or service location"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-left">
                  Clients will see this address as your service location.
                </p>
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-left text-gray-700 mb-1">Hourly Rate (Toman) *</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="hourlyRate"
                    value={form.hourlyRate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. 250000"
                    required
                  />
                </div>
              </div>

              {/* Service Areas */}
              <div>
                <label className="block text-left text-gray-700 mb-1">
                  Service Areas (comma separated) *
                </label>
                <div className="relative">
                  <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="serviceAreas"
                    value={form.serviceAreas}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. Tehran, Karaj, Shiraz"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-left">
                  Separate city names with commas.
                </p>
              </div>

              {/* Skills with Priority (Drag & Drop) */}
              <div className="border-t pt-4">
                <label className="block text-left text-gray-700 mb-2 font-semibold">
                  Your Skills & Expertise <FaInfoCircle className="inline ml-1 text-gray-400" />
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  Select all skills that apply to you. Then drag & drop to set priority (higher = more important).
                </p>

                {/* Available skills (checkboxes) */}
                <div className="grid grid-cols-2 gap-2 mb-4 max-h-40 overflow-y-auto p-2 border rounded bg-gray-50">
                  {availableSkills.map(skill => {
                    const isSelected = selectedSkills.some(s => s.skillId === skill.id);
                    return (
                      <label key={skill.id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSkill(skill)}
                        />
                        {skill.name}
                      </label>
                    );
                  })}
                </div>

                {/* Selected skills with drag & drop */}
                {selectedSkills.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Selected skills (drag to reorder):</p>
                    <div className="bg-gray-50 p-2 rounded">
                      {selectedSkills.map((skill, idx) => (
                        <DraggableSkill
                          key={skill.skillId}
                          skill={skill}
                          index={idx}
                          moveSkill={moveSkill}
                          removeSkill={removeSkill}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Priority 1 = highest importance. Drag items to change order.
                    </p>
                  </div>
                )}
              </div>

              {/* Guidance */}
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <p className="font-semibold">📌 Tips for a great profile:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Add a professional photo later in your profile settings.</li>
                  <li>List only skills you are confident in.</li>
                  <li>Set your service areas precisely to get relevant job offers.</li>
                  <li>Your hourly rate should reflect your experience and market average.</li>
                </ul>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
                >
                  <FaSave /> {loading ? 'Saving...' : 'Save & Continue'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </DndProvider>
  );
}