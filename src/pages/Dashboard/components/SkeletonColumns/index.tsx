import * as S from "./styles";

const SkeletonColumns = () => {
    return (
        <S.WrapperSkeleton>
            <S.SkeletonElement className="skeleton--animation" />
            <S.SkeletonElement className="skeleton--animation" />
            <S.SkeletonElement className="skeleton--animation" />
        </S.WrapperSkeleton>
    );
};

export default SkeletonColumns;