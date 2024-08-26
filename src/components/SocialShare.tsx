import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = () => {
  const shareUrl = import.meta.env.VITE_FRONTEND_URL;
  const title = "Check out this website to reduce your carbon footprint!";

  return (
    <div className="flex space-x-4">
      <FacebookShareButton url={shareUrl} className="focus:outline-none">
        <FacebookIcon size={35} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="focus:outline-none"
      >
        <TwitterIcon size={35} round />
      </TwitterShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className="focus:outline-none"
      >
        <WhatsappIcon size={35} round />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={title}
        source={shareUrl}
        className="focus:outline-none"
      >
        <LinkedinIcon size={35} round />
      </LinkedinShareButton>
      <EmailShareButton
        url={shareUrl}
        subject="CarbonLog is amazing"
        body={title}
        className="focus:outline-none"
      >
        <EmailIcon size={35} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;
