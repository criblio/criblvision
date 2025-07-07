# Upgrading the CriblVision for Splunk App

## Upgrading to Version 3.x

Version 3.x of the CriblVision app introduces a new Cribl Stream asset lookup to replace the previous Worker Group lookup. This will cause dashboards to behave unexpectedly until the cutover to the new lookup is made. If you are upgrading from version 2.x of CriblVision then the following steps will be required to make this cutover:

1. Install version 3.x of CriblVision
2. Run the CriblVision setup page again:
    1. From the **Apps** dropdown, select **Manage Apps**
    2. Selected the **Set up** action for CriblVision
    3. Follow the instructions on the setup page
3. Run the **Populate Cribl Stream Assets Lookup** report by either:
    * Clicking the button on the landing page
    * Clicking the link in the navigation bar
4. Double check that any alerts that were enabled are still enabled

If there are issues after completing these steps, you may need to clear your browser cache to clear cached scripts in Splunk. Clear the browser cache and follow from instructions from step 2 onwards.

If installing the app through other methods, refer to the documentation below on how to configure the app and update your configuration accordingly.