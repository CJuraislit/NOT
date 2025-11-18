import { useState } from 'react';
import { useTemplateQuery, useTemplatesQuery } from '/hooks/queries/template.queries';

export const useActiveTemplate = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: templates, isLoading: isListLoading, isError: isListError } = useTemplatesQuery();

  const activeTemplateId = templates?.[activeIndex]?.id;
  const {
    data: template,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = useTemplateQuery(activeTemplateId);

  const changeTemplate = (direction: 'prev' | 'next') => {
    if (!templates) return;

    const delta = direction === 'prev' ? -1 : 1;
    const nextIndex = activeIndex + delta;

    if (nextIndex < 0 || nextIndex >= templates.length) return;

    setActiveIndex(nextIndex);
  };

  return {
    templates,
    template,
    activeIndex,
    changeTemplate,
    isListLoading,
    isListError,
    isTemplateLoading,
    isTemplateError,
  };
};
