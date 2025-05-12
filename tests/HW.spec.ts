import {test, expect} from '@playwright/test';

test('Test Check Sauce Demo Page',async({page})=>{
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle('Swag Labs')
    await page.waitForTimeout(1000)
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click()
    await page.waitForTimeout(1000)
    await expect(page.url()).toContain('inventory.html')
    
})

test('Test Check Empty username & password',async({page})=>{
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle('Swag Labs')
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required')
})

test('Test Check Empty password',async({page})=>{
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle('Swag Labs')
    await page.waitForTimeout(1000)
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required')
})

//this is HW

test('Add product to cart and check contents then logout', async({page}) => {
  await page.goto('https://www.saucedemo.com/')
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await expect(page).toHaveURL(/.*inventory.html/)

  //Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  // go to the cart
  await page.locator('.shopping_cart_link').click()
  await expect(page).toHaveURL(/.*cart.html/)

  // check if the product is contents the cart?
  const cartItem = page.locator('.inventory_item_name')
  await expect(cartItem).toContainText('Sauce Labs Backpack')

  //Log out
  await page.locator('#react-burger-menu-btn').click()
  await page.waitForTimeout(1000)
  await page.locator('#logout_sidebar_link').click()
  await expect(page).toHaveURL('https://www.saucedemo.com/')
})
