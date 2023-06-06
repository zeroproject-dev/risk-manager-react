import './Fieldset.modules.css';

interface FieldsetProps {
	title: string;
	children: React.ReactNode;
}

export function Fieldset({ children, title }: FieldsetProps) {
	return (
		<fieldset className="field">
			<legend>{title}</legend>
			{children}
		</fieldset>
	);
}
