import { Risk } from '../types/Risk';
import { RiskItem } from './RiskItem';

interface RiskListProps {
	risks: Risk[];
	onRemoveRisk: (id: string) => void;
}

export function RiskList({ risks, onRemoveRisk }: RiskListProps) {
	return (
		<div>
			{risks.map((risk) => (
				<RiskItem key={risk.id} onRemoveRisk={onRemoveRisk} risk={risk} />
			))}
		</div>
	);
}
