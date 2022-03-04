<script>
    import BaseModal from "./BaseModal.svelte";
    import Tabs from "../Tabs/Tabs.svelte";
    import TabList from "../Tabs/TabList.svelte";
    import Tab from "../Tabs/Tab.svelte";
    import TabPanel from "../Tabs/TabPanel.svelte";

    export let isOpen;
</script>

<BaseModal bind:isOpen {...$$props}>
    <Tabs>
        <TabList>
            <Tab name="modal.login">Login</Tab>
            <Tab name="modal.register">Register</Tab>
        </TabList>
        <TabPanel name="modal.login">This is Login</TabPanel>
        <TabPanel name="modal.register">This is Register</TabPanel>
    </Tabs>
</BaseModal>