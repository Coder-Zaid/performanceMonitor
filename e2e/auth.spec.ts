import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully as founder', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[placeholder="admin@itsprelude.com"]', 'founder@prelude.com');
    await page.fill('input[type="password"]', 'password123');
    
    await page.click('button:has-text("Sign In")');
    
    // Check if redirected to dashboard
    await expect(page).toHaveURL('/');
    
    // Check if dashboard content is visible
    await expect(page.locator('h1')).toContainText('Executive Overview');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[placeholder="admin@itsprelude.com"]', 'wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    await page.click('button:has-text("Sign In")');
    
    // Check for error toast
    await expect(page.locator('text=Login failed')).toBeVisible();
  });
});
