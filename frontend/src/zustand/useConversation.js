import {create} from 'zustand';

const useConversation = create((set)=>({
    selectedConversation : null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation, selectedGroup: null }), // Reset selectedGroup when selecting a private conversation
    selectedGroup: null,
    setSelectedGroup: (selectedGroup) => set({ selectedGroup, selectedConversation: null }), // Reset selectedConversation when selecting a group
    messages : [],
    setMessages : (messages) => set({messages}),
    groupMessages: [],
  setGroupMessages: (groupMessages) => set({ groupMessages }),
}))

export default useConversation;