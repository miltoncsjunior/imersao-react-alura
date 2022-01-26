import appConfig from '../../config.json';

export default function SubTitle(props) {
    const Text = props.children;
    const Tag = props.tag || 'h2';

    return (
        <>
            <Tag>{Text}</Tag>

            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['050']};
                    font-size: 24px;
                    font-weight: 300;
                }
            `}</style>
        </>
    );
}