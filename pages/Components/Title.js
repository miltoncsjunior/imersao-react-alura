import appConfig from '../../config.json';

export default function Title(props) {
    const Text = props.children;
    const Tag = props.tag || 'h1';
    const Color = props.color || `${appConfig.theme.colors.neutrals['000']}`;

    return (
        <>
            <Tag>{Text}</Tag>

            <style jsx>{`
                ${Tag} {
                    color: ${Color};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}