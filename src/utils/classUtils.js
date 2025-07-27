/**
 * Utility functions for working with classes data
 * These functions can be used across different modules like Teacher Management, Student Management, etc.
 */

/**
 * Get a simple array of class names for dropdown/selection purposes
 * @param {Array} classes - Array of class objects from Redux store
 * @returns {Array} Array of class name strings
 */
export const getClassNames = (classes) => {
  if (!Array.isArray(classes)) return [];
  return classes.map(classObj => classObj.className).filter(Boolean);
};

/**
 * Get classes with their sections for more detailed selection
 * @param {Array} classes - Array of class objects from Redux store
 * @returns {Array} Array of objects with className and sections
 */
export const getClassesWithSections = (classes) => {
  if (!Array.isArray(classes)) return [];
  return classes.map(classObj => ({
    className: classObj.className,
    sections: classObj.sections?.map(sec => sec.section) || []
  }));
};

/**
 * Get formatted class-section combinations for assignment purposes
 * @param {Array} classes - Array of class objects from Redux store
 * @returns {Array} Array of strings like "Class 6 - A", "Class 7 - B", etc.
 */
export const getClassSectionCombinations = (classes) => {
  if (!Array.isArray(classes)) return [];
  
  const combinations = [];
  classes.forEach(classObj => {
    if (classObj.sections && Array.isArray(classObj.sections)) {
      classObj.sections.forEach(section => {
        combinations.push(`${classObj.className} - ${section.section}`);
      });
    }
  });
  
  return combinations.sort(); // Sort alphabetically
};

/**
 * Get unique class names only (no duplicates)
 * @param {Array} classes - Array of class objects from Redux store
 * @returns {Array} Array of unique class name strings
 */
export const getUniqueClassNames = (classes) => {
  const classNames = getClassNames(classes);
  return [...new Set(classNames)]; // Remove duplicates using Set
};

/**
 * Find a class by name
 * @param {Array} classes - Array of class objects from Redux store
 * @param {string} className - Name of the class to find
 * @returns {Object|null} Class object or null if not found
 */
export const findClassByName = (classes, className) => {
  if (!Array.isArray(classes)) return null;
  return classes.find(classObj => 
    classObj.className && classObj.className.toLowerCase() === className.toLowerCase()
  ) || null;
};

/**
 * Get total student count across all classes
 * @param {Array} classes - Array of class objects from Redux store
 * @returns {number} Total number of students
 */
export const getTotalStudentCount = (classes) => {
  if (!Array.isArray(classes)) return 0;
  
  return classes.reduce((total, classObj) => {
    if (classObj.sections && Array.isArray(classObj.sections)) {
      const classTotal = classObj.sections.reduce((sectionTotal, section) => {
        return sectionTotal + (section.students?.length || 0);
      }, 0);
      return total + classTotal;
    }
    return total;
  }, 0);
};

/**
 * Get classes formatted for select/dropdown components
 * @param {Array} classes - Array of class objects from Redux store
 * @param {boolean} includeSections - Whether to include sections in the options
 * @returns {Array} Array of objects with label and value properties
 */
export const getClassesForSelect = (classes, includeSections = false) => {
  if (!Array.isArray(classes)) return [];
  
  if (includeSections) {
    const options = [];
    classes.forEach(classObj => {
      if (classObj.sections && Array.isArray(classObj.sections)) {
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
  } else {
    return classes
      .map(classObj => ({
        label: classObj.className,
        value: classObj.className,
        sectionCount: classObj.sections?.length || 0,
        totalStudents: classObj.sections?.reduce((total, section) => 
          total + (section.students?.length || 0), 0) || 0
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
};

/**
 * Validate if a class name already exists
 * @param {Array} classes - Array of class objects from Redux store
 * @param {string} className - Class name to validate
 * @param {number|string} excludeId - ID to exclude from validation (for editing)
 * @returns {boolean} True if class name already exists
 */
export const isClassNameExists = (classes, className, excludeId = null) => {
  if (!Array.isArray(classes) || !className) return false;
  
  return classes.some(classObj => 
    classObj.className && 
    classObj.className.toLowerCase() === className.toLowerCase() &&
    (excludeId === null || classObj.id !== excludeId)
  );
}; 