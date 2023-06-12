interface SelectRiskProps {
	label: string;
	name: string;
	options: { value: string; tag: string; label: string }[];
	value: string;

	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

	tag?: boolean;
}

export function SelectRisk({
	onChange,
	label,
	name,
	value,
	options,
	tag,
}: SelectRiskProps) {
	return (
		<label>
			{label}:
			<select name={name} onChange={onChange} value={value}>
				{options.map((option) => {
					return (
						<option
							key={option.tag ?? crypto.randomUUID()}
							value={tag ? option.tag : option.value}
						>
							{option.label}
						</option>
					);
				})}
			</select>
		</label>
	);
}
