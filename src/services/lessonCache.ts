// Lesson Generation Caching System

interface CachedLesson {
  id: string;
  topic: string;
  gradeLevel: string;
  content: string;
  timestamp: number;
  expiresAt: number;
}

class LessonCache {
  private cache: Map<string, CachedLesson> = new Map();
  private cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
  
  generateKey(topic: string, gradeLevel: string): string {
    return `${topic}-${gradeLevel}`.toLowerCase();
  }
  
  set(lesson: CachedLesson): void {
    const expiresAt = Date.now() + this.cacheExpiry;
    this.cache.set(lesson.id, { ...lesson, expiresAt });
  }
  
  get(topic: string, gradeLevel: string): CachedLesson | null {
    const key = this.generateKey(topic, gradeLevel);
    const lesson = this.cache.get(key);
    
    if (!lesson) return null;
    
    if (Date.now() > lesson.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return lesson;
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  getStats(): { total: number; expired: number } {
    let expired = 0;
    this.cache.forEach((lesson) => {
      if (Date.now() > lesson.expiresAt) expired++;
    });
    return { total: this.cache.size, expired };
  }
}

export default new LessonCache();