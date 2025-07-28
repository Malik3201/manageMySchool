export const getClassNames = (classes) => {
  if (!Array.isArray(classes)) return [];
  return classes.map(classObj => classObj.className).filter(Boolean);
};

export const getClassesWithSections = (classes) => {
  if (!Array.isArray(classes)) return [];
  return classes.map(classObj => ({
    className: classObj.className,
    sections: classObj.sections?.map(sec => sec.section) || []
  }));
};

export const getClassSectionCombinations = (classes) => {
  if (!Array.isArray(classes)) return [];
  const combinations = [];
  classes.forEach(classObj => {
    if (Array.isArray(classObj.sections)) {
      classObj.sections.forEach(section => {
        combinations.push(`${classObj.className} - ${section.section}`);
      });
    }
  });
  return combinations.sort();
};

export const getUniqueClassNames = (classes) => {
  const classNames = getClassNames(classes);
  return [...new Set(classNames)];
};

export const findClassByName = (classes, className) => {
  if (!Array.isArray(classes)) return null;
  return classes.find(classObj =>
    classObj.className?.toLowerCase() === className.toLowerCase()
  ) || null;
};

export const getTotalStudentCount = (classes) => {
  if (!Array.isArray(classes)) return 0;
  return classes.reduce((total, classObj) => {
    if (Array.isArray(classObj.sections)) {
      const classTotal = classObj.sections.reduce((sectionTotal, section) => {
        return sectionTotal + (section.students?.length || 0);
      }, 0);
      return total + classTotal;
    }
    return total;
  }, 0);
};

export const getClassesForSelect = (classes, includeSections = false) => {
  if (!Array.isArray(classes)) return [];
  if (includeSections) {
    const options = [];
    classes.forEach(classObj => {
      if (Array.isArray(classObj.sections)) {
        classObj.sections.forEach(section => {
          options.push({
            label: `${classObj.className} - Section ${section.section}`,
            value: `${classObj.className} - ${section.section}`,
            className: classObj.className,
            section: section.section,
            studentCount: section.students?.length || 0
          });
        });
      }
    });
    return options.sort((a, b) => a.label.localeCompare(b.label));
  }
  return classes
    .map(classObj => ({
      label: classObj.className,
      value: classObj.className,
      sectionCount: classObj.sections?.length || 0,
      totalStudents: classObj.sections?.reduce((total, section) =>
        total + (section.students?.length || 0), 0) || 0
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};
export const isClassNameExists = (classes, className, excludeId = null) => {
  if (!Array.isArray(classes) || !className) return false;
  return classes.some(classObj =>
    classObj.className?.toLowerCase() === className.toLowerCase() &&
    (excludeId === null || classObj.id !== excludeId)
  );
};