
function Socials() {

    const changeImg = (id, img_src) => {
        document.getElementById(id).src = img_src;
    }

    return (
        <div className="socials" >
            <a href="https://discord.gg/cjVUsD85">
            <img src="src/components/img/discord.png" id="discord" onMouseOver={() => changeImg('discord','src/components/img/discord_hover.png')} onMouseOut={() => changeImg('discord','src/components/img/discord.png')} width="40" height="40" />
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://twitter.com/SkeletonFamClub">
            <img src="src/components/img/twitter.png" id="twitter" onMouseOver={() => changeImg('twitter','src/components/img/twitter_hover.png')} onMouseOut={() => changeImg('twitter','src/components/img/twitter.png')} width="40" height="40" />
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="#">
            <img src="src/components/img/opensea.png" id="opensea" onMouseOver={() => changeImg('opensea','src/components/img/opensea_hover.png')} onMouseOut={() => changeImg('opensea','src/components/img/opensea.png')} width="39" height="39" />
            </a>
        </div>
    );
};

export default Socials;