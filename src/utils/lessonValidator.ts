// Lesson Validation Utilities

export interface LessonValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class LessonValidator {
  validateTopic(topic: string): string[] {
    const errors: string[] = [];
    
    if (!topic || topic.trim().length === 0) {
      errors.push('Topic is required');
    }
    if (topic.length < 3) {
      errors.push('Topic must be at least 3 characters');
    }
    if (topic.length > 200) {
      errors.push('Topic cannot exceed 200 characters');
    }
    
    return errors;
  }
  
  validateGradeLevel(gradeLevel: string): string[] {
    const validLevels = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const errors: string[] = [];
    
    if (!validLevels.includes(gradeLevel)) {
      errors.push(`Grade level must be one of: ${validLevels.join(', ')}`);
    }
    
    return errors;
  }
  
  validateLesson(topic: string, gradeLevel: string): LessonValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    errors.push(...this.validateTopic(topic));
    errors.push(...this.validateGradeLevel(gradeLevel));
    
    if (topic.length > 100) {
      warnings.push('Topic is quite long, consider shortening it');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

export const validator = new LessonValidator();