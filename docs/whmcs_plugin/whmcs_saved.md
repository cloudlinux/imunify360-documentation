# Imunify360 WHMCS Plugin

[[toc]]

## Overview

CloudLinux Licenses For WHMCS allows you to automatically provision CloudLinux, Imunify360, and KernelCare licenses along with selected products. You can provision them for free or as a paid add-on to your product. Owing to CloudLinux Licenses add-on, all module commands on your main product are automatically reproduced on the license product.

**Admin Area Functionality**

* Create license
* Terminate license
* Suspend/Unsuspend license (only IP-based licenses)
* Change license IP address
* View license details

**Client Area Functionality**

* View license details
* Change license IP address

**Addon Functionality**

* Manage relations between addon and license product
* Manage relations between server and license product
* Manage relations between configurable options and license product
* Automatically add license product to order when relation is triggered
* View existing license
* Dependencies between module actions – every action: Create, Terminate, Suspend or Unsuspend called on the server product will result with the same action performed on the licensed products
* Flexible filtering of existing licenses

**Additionally**

* Multi-Language Support – only provisioning module
* Supports CloudLinux, KernelCare and Imunify360 Licenses
* Supports WHMCS V6 and later


## Installation and Configuration


In this section we will show you how to set up our products.

* [Installation and Update](/whmcs_plugin/#installation-and-update)

* [Configuration of Product](/whmcs_plugin/#configuration-of-product)

* [Configuration of Add-on](/whmcs_plugin/#configuration-of-add-on)



### Installation and Update


1. Download CloudLinux Licenses For WHMCS:
   * Production: [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-latest.zip)
   * Beta: [http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip](http://repo.cloudlinux.com/plugins/whmcs-cl-plugin-beta.zip)
2. Upload archive to your WHMCS root folder and extract it. Files should automatically jump into their places.
3. Run the following script:

<div class="notranslate">

```
php <whmcs_root>/clDeploy.php --migrate
```

</div>

::: tip Note
If your hosting requires specific files permissions, change them accordingly in the folder: <span class="notranslate">`<whmcs_root>/modules/servers/CloudLinuxLicenses`</span>
:::

### Configuration of Product

1. Log into your WHMCS admin area and go to <span class="notranslate">_Setup → Products/Services → Products/Services_</span>. Click <span class="notranslate">_Create a New Group_</span>
2. Fill <span class="notranslate">_Product Group Name_</span> (product group will be visible under that name in your WHMCS system) and click <span class="notranslate">_Save Changes_</span>
3. Click <span class="notranslate">_Create a New Product_</span>. Choose <span class="notranslate">_Other_</span> from <span class="notranslate">_Product Type_</span> drop-down menu and previously created product group from <span class="notranslate">Product Group</span> drop-down menu.
4. Fill <span class="notranslate">_Product Name_</span> and click <span class="notranslate">_Continue_</span>.
5. Set up this product as hidden through marking <span class="notranslate">_Hidden_</span> checkbox at <span class="notranslate">_Details_</span> tab. Do not set up pricing for this product, it will be done in another way.
6. Go to the <span class="notranslate">_Module Settings_</span> tab and select <span class="notranslate">**_CloudLinux Licenses_**</span> from <span class="notranslate">_Module Name_</span> drop-down.
7. Fill <span class="notranslate">_Username_</span> and <span class="notranslate">_Password_</span> with your CloudLinux API access details (you can find them on your CLN profile page, username is your login and password is API secret key) and select <span class="notranslate">**_Imunify360_**</span> from <span class="notranslate">_Product_</span> drop-down, then choose desired <span class="notranslate">_License Type_</span>. If you'd like to use key based licenses, tick <span class="notranslate">_Create Key based license_</span> checkbox.
8. Click <span class="notranslate">_Save Changes_</span> to confirm.
9. Setup desired <span class="notranslate">_Auto-setup_</span> options.

:::tip Note
You can use the CloudLinux license module as an individual product. By default, for IP license a client’s IP address defined while ordering is used. You can change license IP in service settings (as an administrator or a user). If you want to use a custom field to get the correct IP during the order, you should create a custom field with any field name where IP phrase is used.
:::

Example:

![](/images/WHMCSCustomField.png)


### Configuration of Add-on

1. Go to <span class="notranslate">_Setup → Add-on Modules_</span>, find <span class="notranslate">_CloudLinux Licenses Add-on_</span> and click <span class="notranslate">_Activate_</span> next to it.
2. The next step is permitting access to this module. Click <span class="notranslate">_Configure_</span>, select admin roles and confirm by clicking <span class="notranslate">_Save Changes_</span>.

![](/images/whmcsfig1imunify360licenseforwhmcs_zoom70.png)

_Fig 1: Imunify360 License For WHMCS provisioning module configuration._

![](/images/fig2imunify360licenseforwhmcsaddon_zoom70.png)

_Fig 2: Imunify360 License For WHMCS add-on module main page._

## Management


In this section you can find two ways of linking license product with your server product as well as other possibilities of the module.

* [Link Via Add-on – Optional License](/whmcs_plugin/#link-via-add-on-optional-license)
* [Link Products Directly](/whmcs_plugin/#link-products-directly)
* [Link Via Configurable Options](/whmcs_plugin/#link-via-configurable-options)
* [Link Add-ons Directly](/whmcs_plugin/#link-add-ons-directly)
* [Imunify360 Key Licenses](/whmcs_plugin/#imunify360-key-licenses)
* [Order](/whmcs_plugin/#)
* [Admin Area](/whmcs_plugin/#admin-area)
* [Client Area](/whmcs_plugin/#client-area)
* [Licenses List](/whmcs_plugin/#licenses-list)
* [Add-on Licenses List](/whmcs_plugin/#add-on-licenses-list)

### Link Via Add-on – Optional License


In order to allow your client to decide whether he wants to order a server with or without the license, we will use Product Add-on. In this way, when the client orders an add-on, the relation will be triggered and the license product will be ordered along with the module.

The following steps must be performed to prepare such connection:

1. Go to <span class="notranslate">_Setup → Products/Services → Products Add-ons_</span> and click <span class="notranslate">_Add New Add-on_</span>.
2. Fill addon name, set up billing cycle and price. Then tick <span class="notranslate">_Show on Order_</span> checkbox, assign add-on to the product and click <span class="notranslate">_Save Changes_</span>.

![](/images/fig3configurationofproductaddon1_zoom50.png)

![](/images/fig3configurationofproductaddon2_zoom50.png)
_Fig 3: Configuration of product add-on, which will trigger license product adding._


1. Go to <span class="notranslate">_Add-ons → CloudLinux Licenses Add-on → Add-on Relations_</span> and click <span class="notranslate">_Add Relation_</span>.
2. Select previously created product add-on and license product as shown below and click <span class="notranslate">_Add Relation_</span>.

![](/images/fig4creatingrelation_zoom70.png)
_Fig 4: Creating relation between product add-on and provisioning module._

### Link Products Directly


If you want to offer server along with the license, perform the following steps.

::: tip Note
Please do not set up pricing for license provisioning product. In exchange, you can increase a price for server provisioning product.
:::

1. Prepare license provisioning product as described in the [Configuration of Product](/whmcs_plugin/#configuration-of-product) section of this documentation.
2. Go to <span class="notranslate">_Add-ons → CloudLinux Licenses Add-on → Products Relations_</span> and click <span class="notranslate">_Add Relation_</span>.
3. Select server provisioning product from the Main product drop-down list and license provisioning product from the <span class="notranslate">_Linked Product With License_</span> and click <span class="notranslate">_Add Relation_</span>.

![](/images/fig5creatingrelationdirectly_zoom70.png)
_Fig 5: Creating relations directly between server and license provisioning modules._



### Link Via Configurable Options


In order to allow your client to decide whether he wants to order server with or without license we can use <span class="notranslate">_Configurable Options_</span> ( [https://docs.whmcs.com/Addons_and_Configurable_Options](https://docs.whmcs.com/Addons_and_Configurable_Options)).

Below we will show what steps to proceed to prepare such connection:
1. Configure <span class="notranslate">_CloudLinuxLicenses_</span> product as described [here](/whmcs_plugin/#configuration-of-product).
2. Go to <span class="notranslate">_Setup → Products/Services → Configurable Options_</span> and click <span class="notranslate">_Create a New Group_</span>.
3. Fill group name and add <span class="notranslate">_New Configurable Option_</span>, set up billing cycle, price and option type. Then save changes.
4. Go to <span class="notranslate">_Add-ons → CloudLinux Licenses Add-on → Configurable Options Relations_</span> and click <span class="notranslate">_Add Relation_</span>.
5. Choose appropriate configurable option and license product which it is assigned to and click <span class="notranslate">_Add relation_</span>.

::: tip Notes

   * Plugin doesn’t support <span class="notranslate">“quantity”</span> type of <span class="notranslate">Configurable Options</span>
   * A related product can’t contain two (or more) products with the same license type
   * If you have changed <span class="notranslate">Dedicated IP</span> of the main product, then each related IP-based product will terminate an old IP license and create a new one for a new IP
:::

![](/images/fig6creatingrelationdirectlybetweenserverandlicenseprovisioningmodules_zoom70.png)

_Fig 6: Creating relation directly between server and license provisioning modules._

### Link Add-ons Directly<sup>WHMCS 7.2.x+</sup>

WHMCS 7.2 introduces the ability to associate <span class="notranslate">Product Add-ons</span> with <span class="notranslate">Provisioning Modules</span>.

In order to allow your client to decide whether he wants to order server with or without license we will use product addon. Below we will show you what steps to proceed to prepare such connection:

1. Go to <span class="notranslate">_Setup → Products/Services → Products Add-ons_</span> and click <span class="notranslate">_Add New Add-on_</span>.
2. Fill add-on name, set up billing cycle and price. Then tick <span class="notranslate">_Show on Order_</span> checkbox, assign add-on to product.
3. Go to the <span class="notranslate">_Module Settings_</span> tab and select <span class="notranslate">_CloudLinux Licenses_</span> from <span class="notranslate">_Module Name_</span> drop-down.
4. Fill <span class="notranslate">_Username_</span> and <span class="notranslate">_Password_</span> with your CloudLinux API access (API secret key) details and select desired license type from <span class="notranslate">_License Type_</span> drop-down. Click <span class="notranslate">_Save Changes_</span> to confirm.

![](/images/fig6configurationofproductaddon_zoom50.png)

_Fig 7: Configuration of product add-on with Provisioning Modules._

### Imunify360 Key Licenses


1. To set Imunify360 Key license while adding service in <span class="notranslate">Module Settings</span>, do the following:

   * choose <span class="notranslate">**_Imunify360_**</span> in <span class="notranslate">_License Type_</span> drop-down
   * mark <span class="notranslate">_Use Key_</span> (instead of IP address) checkbox
   * enter IP registration token (API secret key) from <span class="notranslate">_Profile_</span> page in CLN
   * in <span class="notranslate">_Max Users_</span> field enter the number of users per server
   * in <span class="notranslate">_Key Limit_</span> field enter the number of servers and click <span class="notranslate">_Save Changes_</span>

![](/images/fig7imunify360productsettings_zoom50.png)
_Fig 8: Imunify360 Product settings._

   * the <span class="notranslate">_License Key Custom Field_</span> will be automatically added
   * the <span class="notranslate">_License Key Custom Field_</span> is displayed while editing service

2. To edit service do the following:
     * when <span class="notranslate">_Service Created Successfully_</span> message appears, you can edit <span class="notranslate">_Service_</span>
     * enter information and settings and click <span class="notranslate">_Save Changes_</span>

![](/images/fig8imunify360servicesettings_zoom50.png)
_Fig 9: Imunify360 Service settings._


### Order


All the services registered in the account are displayed in <span class="notranslate">_My Products & Services_</span> area. When you choose a particular Product/Service and click <span class="notranslate">_View Details_</span>, you can view Product information, change license key, view Add-ons or make changes in <span class="notranslate">Management Actions</span> section.

![](/images/fig9clientproductslist_zoom50.png)
_Fig 10: Client’s products list._

![](/images/fig10licensesdetails_zoom50.png)

_Fig 11: Licenses details._

To order and purchase a new service do the following:
* choose <span class="notranslate">_Category → Imunify360 Group_</span> and click <span class="notranslate">_Order Now_</span> on a particular service

![](/images/fig11orderproductsgroup_zoom50.png)
_Fig 12: Order - Products group._

* choose <span class="notranslate">_Billing Cycle_</span> if possible
* enter information in <span class="notranslate">_Configure Server_</span> area
* choose <span class="notranslate">_Available Add-ons_</span> and click <span class="notranslate">_Continue Shopping_</span> to proceed or <span class="notranslate">_Checkout_</span> to view service details

![](/images/fig12orderconfigureproduct_zoom50.png)

_Fig 13: Order - Configure product._

* enter <span class="notranslate">_Promotional Code_</span> in a specific field if you have one
* choose <span class="notranslate">_Payment Method_</span> and click <span class="notranslate">_Continue Shopping_</span>

![](/images/fig13orderreviewandcheckout_zoom50.png)

_Fig 14: Order - review and checkout._


### Admin Area


From the admin area it is possible to command such actions as create, terminate, suspend/unsuspend and change IP address. Nonetheless, these actions can be ordered only on the server provisioning module and will be automatically reproduced for the license provisioning product.

Only change IP address functionality have to be ordered manually.

You can also view the details of created license.

![](/images/fig14imunify360licensesforwhmcsadminarea_zoom50.png)

_Fig 15: Imunify360 Licenses For WHMCS admin area._


### Client Area


The clients are also able to view their servers license details. And as well as you, they are able to change IP address of their licenses.

![](/images/fig15imunify360licensesforwhmcsclientarea_zoom50.png)

_Fig 16: Imunify360 Licenses For WHMCS Client Area._

To change IP address, click <span class="notranslate">_Change_</span> as shown on the screen above. Then specify IP address and click <span class="notranslate">_Save_</span>.
![](/images/fig16changinglicenseipaddress_zoom70.png)

_Fig 17: Changing License IP Address._


### Licenses List


You can view the list of all licenses owned by your client at our add-on → <span class="notranslate">_Licenses List_</span>.
You can filter the list of licenses by client name, server provisioning products, license provisioning products and license IP address/Key.

![](/images/fig18licenseslist_zoom70.png)
_Fig 18: Licenses List._


###  Add-on Licenses List<sup>WHMCS 7.2.x+</sup>

You can view list of all product add-on with <span class="notranslate">Provisioning Modules</span> licenses owned by your client at our addon → <span class="notranslate">Licenses List</span>.

![](/images/fig19addonlicenseslist_zoom70.png)
_Fig 19: Add-on Licenses List._

## Common Problems


After activating the server provisioning product, license provisioning product bounded to it is still pending.

**Reason**: License IP address may be already taken.
**Solution**: Change server IP address.


