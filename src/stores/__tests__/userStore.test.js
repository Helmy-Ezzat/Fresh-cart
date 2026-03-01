/**
 * Unit Tests for User Store
 * 
 * لتشغيل الاختبارات:
 * npm test
 */

import { renderHook, act } from '@testing-library/react';
import useUserStore from '../userStore';

describe('User Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.logout();
    });
    localStorage.clear();
  });

  test('should initialize with null values', () => {
    const { result } = renderHook(() => useUserStore());
    
    expect(result.current.userToken).toBeNull();
    expect(result.current.userData).toBeNull();
  });

  test('should set user token and decode it', () => {
    const { result } = renderHook(() => useUserStore());
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5hbWUiOiJUZXN0IFVzZXIifQ.test';
    
    act(() => {
      result.current.setUserToken(mockToken);
    });
    
    expect(result.current.userToken).toBe(mockToken);
    expect(result.current.userData).toBeDefined();
    expect(localStorage.getItem('userToken')).toBe(mockToken);
  });

  test('should logout and clear data', () => {
    const { result } = renderHook(() => useUserStore());
    const mockToken = 'test-token';
    
    act(() => {
      result.current.setUserToken(mockToken);
    });
    
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.userToken).toBeNull();
    expect(result.current.userData).toBeNull();
    expect(localStorage.getItem('userToken')).toBeNull();
  });
});
