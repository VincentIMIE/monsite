import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Eye, EyeOff, Trash2, GripVertical } from 'lucide-react';
import { SectionConfig } from '../../types';

interface SectionManagerProps {
  sections: SectionConfig[];
  onToggleVisibility: (sectionId: string) => void;
  onRemoveSection: (sectionId: string) => void;
  onReorderSections: (reorderedSections: SectionConfig[]) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onToggleVisibility,
  onRemoveSection,
  onReorderSections,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = [...sections];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorderSections(items);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Manage Sections</h2>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-2"
            >
              {sections.map((section, index) => (
                <Draggable 
                  key={section.id} 
                  draggableId={section.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center justify-between p-3 rounded-md border ${
                        section.visible ? 'bg-white' : 'bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div {...provided.dragHandleProps} className="cursor-move">
                          <GripVertical size={20} className="text-gray-400" />
                        </div>
                        <span className={section.visible ? 'font-medium' : 'text-gray-500'}>
                          {section.title}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {section.type}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onToggleVisibility(section.id)}
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          {section.visible ? (
                            <Eye size={18} className="text-green-600" />
                          ) : (
                            <EyeOff size={18} className="text-gray-400" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => onRemoveSection(section.id)}
                          className="p-1 rounded hover:bg-red-100"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SectionManager;