# CloudLinux Monetize WHMCS Module

## Overview

The CloudLinux Monetize module integrates Imunify security services (Patch) with your WHMCS installation, enabling you to sell and provision these services directly from your client area with automated billing and provisioning.

**Current Version:** 1.0.4

## See also

- **[Upgrade Guide](./UPGRADE)** - Step-by-step module upgrade instructions

## System Requirements

- **PHP Version:** PHP 7.3 or higher
- **WHMCS Version:** Compatible with WHMCS 8.0 and later
- **Database:** MySQL/MariaDB (as required by WHMCS)

### Prerequisites

Before installing the module, ensure the following prerequisites are met:

1. **USD Currency Configuration**
   - The USD currency must be configured in your WHMCS installation
   - Go to **Setup > Payments > Currencies** and ensure USD is active
   - Activation will fail if USD currency is not found

![](/images/whmcs_cloudlinux_monetize/usd_currency_enabled.png)

2. **CloudLinux API Access**
   - You must have a valid CloudLinux API key
   - The API key will be required during module configuration

3. **WHMCS Admin Access**
   - Full administrator access to your WHMCS installation
   - Permissions to install addon and provisioning modules

## Installation

### Step 1: Download Module Files

1. Download the latest version of the CloudLinux Monetize module from the [CloudLinux repository](https://repo.whmcs.cloudlinux.com/whmcs-cloudlinux-monetize-plugin-latest.zip) or select a specific version from the [CloudLinux website](https://repo.whmcs.cloudlinux.com/)
2. Extract the archive to a temporary location on your computer

:::tip Note
Make sure you download the complete module package containing both the addon and provisioning modules.
:::

### Step 2: Upload Module Files to WHMCS

Upload the module files to your WHMCS installation directory:

1. **Addon Module:**
   - Upload the contents of `modules/addons/CloudLinuxMonetize/` to:
     ```
     /path/to/whmcs/modules/addons/CloudLinuxMonetize/
     ```

2. **Provisioning Module:**
   - Upload the contents of `modules/servers/CloudLinuxMonetize/` to:
     ```
     /path/to/whmcs/modules/servers/CloudLinuxMonetize/
     ```

3. **Verify File Structure:**
   Ensure the following structure exists:
   ```
   modules/
   ├── addons/
   │   └── CloudLinuxMonetize/
   │       ├── CloudLinuxMonetize.php
   │       ├── hooks.php
   │       ├── assets/
   │       ├── lang/
   │       ├── lib/
   │       └── templates/
   └── servers/
       └── CloudLinuxMonetize/
           ├── CloudLinuxMonetize.php
           ├── assets/
           ├── Configs/
           ├── lang/
           ├── lib/
           └── templates/
   ```

### Step 3: Activate the Addon Module

1. Log in to your WHMCS admin area
2. Navigate to **Setup > Addon Modules**
3. Locate **CloudLinux Monetize** in the list
4. Click **Activate**
5. If activation is successful, you'll see a success message

![](/images/whmcs_cloudlinux_monetize/activate_addon.png)

**What happens during activation:**
- Validates that USD currency is configured
- Reactivates any previously retired Imunify products (if module was deactivated before)
- Creates email templates for order notifications
- Sets up necessary database structures

:::tip Note
If activation fails with "USD currency not configured", go to **Setup > Payments > Currencies**, add USD currency if it doesn't exist, ensure it's active, and try activating again.

![](/images/whmcs_cloudlinux_monetize/usd_currency_enabled.png)
:::

### Step 4: Configure the Addon Module

1. After activation, click **Configure** next to CloudLinux Monetize
2. Enter your **CloudLinux API Key** in the configuration field
3. Click **Save Changes**

:::tip Note
The API key is required for the module to communicate with CloudLinux services. You can obtain your API key from your CloudLinux account.
:::

### Step 5: Verify Server Module Installation

The provisioning module (`modules/servers/CloudLinuxMonetize/`) is automatically recognized by WHMCS. You do not need to manually activate it.

:::tip Note
The server module is automatically configured by the addon module. Manual modifications to server settings are not recommended and may disrupt integration.
:::

## Enabling Products

### Import Imunify Products

After installation and configuration, you can import Imunify products:

1. Navigate to **Addons > CloudLinux Monetize** in the admin area
2. Use the product import (green "enable" button) functionality to add:
   - **Imunify Patch** products (vulnerability patching) - Available in version 1.0.3

![](/images/whmcs_cloudlinux_monetize/addon_dashboard.png)

**What happens when you import products:**
- Products are automatically created in your WHMCS system
- Required custom fields are automatically added to each product:
  - **Domain Name** (text, required)
  - **Server IP** (text, required)
  - **EULA Accept** (checkbox, required)
  - **Subscription Target Id** (text, required)
  - **Imunify Id** (text, required)
- Pricing structures are imported from CloudLinux
- Products are organized in a dedicated product group
- Products become available for customers to order

![](/images/whmcs_cloudlinux_monetize/product_group.png)

![](/images/whmcs_cloudlinux_monetize/product_pricing.png)

### EULA Acceptance

The module requires End User License Agreement (EULA) acceptance:

**Admin EULA:**
- When you first navigate to **Addons > CloudLinux Monetize** in the admin area, you must read and accept the EULA to access the module dashboard
- The EULA text is retrieved from the CloudLinux API
- This is a one-time acceptance required for administrative access

![](/images/whmcs_cloudlinux_monetize/admin_eula.png)

**Client EULA:**
- A separate EULA is displayed on product order forms for customers
- The EULA text is retrieved from the CloudLinux API
- Customers must accept the EULA before completing their order
- Currently, the EULA text is available in English only; the API will support other languages in the future

:::tip Note
When the module is deactivated, the EULA acceptance flag is removed from the WHMCS database. However, the information that the EULA was once accepted is preserved on the CloudLinux side for compliance and record-keeping purposes.
:::

:::tip Note
Custom fields are automatically managed by the module and should not be manually modified.
:::

### Product Configuration

When products are imported, you can configure additional settings:

- **Enable Notifications:** Controls whether Imunify sends promotional notifications to customers
  - **Enabled by default** - when enabled, Imunify sends promotional notifications (including product purchase URL) to customers in the hosting panel
  - Configured per product in **Setup > Products/Services > Products/Services > [Select Product] > Module Settings**
  - This setting updates the product configuration on the CloudLinux API end

![](/images/whmcs_cloudlinux_monetize/product_notification_setting.png)

### Price Recalculations

The module automatically updates product pricing on a daily basis through a scheduled cron job. This ensures that:

- Product prices stay synchronized with CloudLinux pricing
- Any pricing changes from CloudLinux are automatically reflected in WHMCS
- Customers always see current pricing when ordering

:::tip Note
Price updates occur automatically via the daily cron job. No manual intervention is required.
:::

## Disabling Products

### Deactivating Individual Products

You can deactivate individual Imunify products through the standard WHMCS product management:

1. Navigate to **Setup > Products/Services > Products/Services**
2. Find the Imunify product you want to deactivate
3. Edit the product and set it to **Hidden** or **Retired**

**What happens when you deactivate a product:**
- The product is no longer visible in the order form
- Existing services remain active and functional
- Customers with active services can still access their Imunify services
- Billing continues for existing services

### Deactivating the Module

To completely deactivate the CloudLinux Monetize module:

1. Navigate to **Setup > Addon Modules**
2. Click **Deactivate** next to CloudLinux Monetize

![](/images/whmcs_cloudlinux_monetize/deactivation_warning.png)

**What happens when you deactivate the module:**
- All Imunify products are deactivated
- Products with existing services are marked as **retired** (not deleted) to preserve service history
- Products without active services are completely removed
- Email templates are removed
- EULA configuration is removed from the WHMCS database
- Module-specific settings are cleaned up

:::warning Important
When the module is deactivated:
- The EULA configuration flag is removed from the WHMCS database
- However, the information that the EULA was once accepted is preserved on the CloudLinux side for compliance and record-keeping purposes
- Customers with active services will continue to have access to their Imunify services
- Products with active services are marked as retired but not deleted to preserve service history
:::

## Version Update Notifications

The module automatically checks for newer versions and displays update notifications in three locations:

### 1. Main WHMCS Dashboard

When a newer version is available, a notification banner appears on the main WHMCS Dashboard (Home page) with a dismiss button. If you dismiss the notification, it will not appear again until an even newer version is released.

![](/images/whmcs_cloudlinux_monetize/upgrade_notification3.png)

### 2. Addon Module List Page

On the **Setup > Addon Modules** page, the module row displays an "Upgrade available" badge when a newer version is detected.

![](/images/whmcs_cloudlinux_monetize/upgrade_notification.png)

### 3. Module Dashboard Page

When you navigate to **Addons > CloudLinux Monetize**, a notification banner appears at the top of the module dashboard if a newer version is available.

![](/images/whmcs_cloudlinux_monetize/upgrade_notification2.png)

:::tip Note
Version checks are performed automatically:
- Once per day via the daily cron job
- Every time an administrator accesses the module dashboard
:::

## Product Support by Version

**Version 1.0.3:**
- Supports **Imunify Patch** product only
- The pricing API endpoint returns pricing only for Patch products
- Only Patch products can be enabled and imported

## Troubleshooting

### Module Not Appearing in Addon Modules List

**Possible Causes:**
- Files not uploaded to correct location
- WHMCS cache needs clearing

**Solution:**
1. Verify file structure matches installation instructions
2. Clear WHMCS cache:
   - Go to **Utilities > System > Clear Cache**
   - Or delete contents of `/path/to/whmcs/templates_c/`
3. Refresh the Addon Modules page

### API Key Not Working

**Solution:**
1. Verify the API key is correct in **Setup > Addon Modules > CloudLinux Monetize > Configure**
2. Check that the API key has proper permissions in your CloudLinux account
3. Test API connectivity from your server

### Products Not Importing

**Solution:**
1. Verify API key is configured correctly
2. Check WHMCS error logs: **Utilities > Logs > Module Log**
3. Ensure USD currency is active
4. Check that product group can be created (sufficient permissions)

## Support and Resources

- **CloudLinux Website:** https://cloudlinux.com/
- **Module Version:** 1.0.3
- **Author:** CloudLinux

---

**Last Updated:** 08 Feb 2026
